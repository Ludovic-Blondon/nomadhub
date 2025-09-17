"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { booking } from "@/db/schemas/room";
import { auth } from "@/lib/auth";

export type CancelBookingState = {
  ok: boolean;
  message: string;
};

export async function cancelBookingAction(
  bookingId: string,
): Promise<CancelBookingState> {
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

    // Vérifier que la réservation existe
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

    // Vérifier que l'utilisateur est soit l'invité soit l'hôte
    const isGuest = existingBooking.guestId === session.user.id;
    const isHost = existingBooking.room?.author.id === session.user.id;

    if (!isGuest && !isHost) {
      return {
        ok: false,
        message: "Non autorisé",
      };
    }

    // Vérifier que la réservation peut être annulée
    if (existingBooking.status === "cancelled") {
      return {
        ok: false,
        message: "Cette réservation est déjà annulée",
      };
    }

    if (existingBooking.status === "completed") {
      return {
        ok: false,
        message: "Impossible d'annuler une réservation terminée",
      };
    }

    // Mettre à jour le statut de la réservation
    await db
      .update(booking)
      .set({
        status: "cancelled",
        updatedAt: new Date(),
      })
      .where(eq(booking.id, bookingId));

    // Revalider les pages concernées
    revalidatePath("/booking");
    revalidatePath("/");

    return {
      ok: true,
      message: "Réservation annulée avec succès",
    };
  } catch {
    return {
      ok: false,
      message: "Erreur lors de l'annulation de la réservation",
    };
  }
}
