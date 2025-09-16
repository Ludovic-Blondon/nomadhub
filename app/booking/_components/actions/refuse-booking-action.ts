"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { booking } from "@/db/schemas/room";
import { auth } from "@/lib/auth";

export type RefuseBookingState = {
  ok: boolean;
  message: string;
};

export async function refuseBookingAction(
  bookingId: string,
): Promise<RefuseBookingState> {
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

    // Vérifier que l'utilisateur est bien l'hôte (seul l'hôte peut refuser)
    if (existingBooking.room?.author.id !== session.user.id) {
      return {
        ok: false,
        message: "Seul l'hôte peut refuser une réservation",
      };
    }

    // Vérifier que la réservation peut être refusée
    if (existingBooking.status === "rejected") {
      return {
        ok: false,
        message: "Cette réservation est déjà refusée",
      };
    }

    if (existingBooking.status === "cancelled") {
      return {
        ok: false,
        message: "Impossible de refuser une réservation annulée",
      };
    }

    if (existingBooking.status === "completed") {
      return {
        ok: false,
        message: "Impossible de refuser une réservation terminée",
      };
    }

    // Mettre à jour le statut de la réservation
    await db
      .update(booking)
      .set({
        status: "rejected",
        updatedAt: new Date(),
      })
      .where(eq(booking.id, bookingId));

    // Revalider les pages concernées
    revalidatePath("/booking");
    revalidatePath("/");

    return {
      ok: true,
      message: "Réservation refusée avec succès",
    };
  } catch {
    return {
      ok: false,
      message: "Erreur lors du refus de la réservation",
    };
  }
}
