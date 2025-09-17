"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { booking } from "@/db/schemas/room";
import { auth } from "@/lib/auth";

export type AcceptBookingState = {
  ok: boolean;
  message: string;
};

export async function acceptBookingAction(
  bookingId: string,
): Promise<AcceptBookingState> {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        ok: false,
        message: "Non autorisé",
      };
    }

    // Vérifier que la réservation existe et que l'utilisateur est l'hôte
    const existingBooking = await db.query.booking.findFirst({
      where: eq(booking.id, bookingId),
      with: {
        room: {
          with: {
            author: true,
          },
        },
      },
    });

    if (!existingBooking) {
      return {
        ok: false,
        message: "Réservation introuvable",
      };
    }

    // Vérifier que l'utilisateur est bien l'hôte (seul l'hôte peut accepter)
    if (existingBooking.room?.author.id !== session.user.id) {
      return {
        ok: false,
        message: "Seul l'hôte peut accepter une réservation",
      };
    }

    // Vérifier que la réservation peut être acceptée
    if (existingBooking.status === "confirmed") {
      return {
        ok: false,
        message: "Cette réservation est déjà confirmée",
      };
    }

    if (existingBooking.status === "cancelled") {
      return {
        ok: false,
        message: "Impossible d'accepter une réservation annulée",
      };
    }

    if (existingBooking.status === "rejected") {
      return {
        ok: false,
        message: "Impossible d'accepter une réservation refusée",
      };
    }

    if (existingBooking.status === "completed") {
      return {
        ok: false,
        message: "Impossible d'accepter une réservation terminée",
      };
    }

    // Mettre à jour le statut de la réservation
    await db
      .update(booking)
      .set({
        status: "confirmed",
        updatedAt: new Date(),
      })
      .where(eq(booking.id, bookingId));

    // Revalider les pages concernées
    revalidatePath("/booking");
    revalidatePath("/");

    return {
      ok: true,
      message: "Réservation acceptée avec succès",
    };
  } catch {
    return {
      ok: false,
      message: "Erreur lors de l'acceptation de la réservation",
    };
  }
}
