import type { Role, Scope } from "@/types";

import { Session } from "better-auth";
import { and } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schemas/room";
import { BookingStatus } from "@/types";

// Constantes pour les statuts
const BOOKING_STATUSES: Record<Scope, BookingStatus[]> = {
  active: ["pending", "confirmed"],
  past: ["cancelled", "completed", "rejected"],
} as const;

// Relations communes pour éviter la duplication
const BOOKING_RELATIONS = {
  room: {
    with: {
      author: true,
      medias: true,
    },
  },
  guest: true,
} as const;

/**
 * Récupère les réservations depuis la base de données selon le rôle et le scope
 * @param role - Rôle de l'utilisateur (host ou guest)
 * @param scope - Scope des réservations (active ou archived)
 * @param session - Session de l'utilisateur
 * @returns Liste des réservations avec leurs relations
 */
export const getBookings = async (
  role: Role,
  scope: Scope,
  session: Session | null,
) => {
  // Guard clause pour session manquante
  if (!session?.userId) {
    return [];
  }

  const userId = session.userId;
  const statuses = BOOKING_STATUSES[scope];

  // Construire la condition where selon le rôle
  const whereCondition =
    role === "host"
      ? buildHostWhereCondition(userId, statuses)
      : buildGuestWhereCondition(userId, statuses);

  // Une seule requête avec la condition appropriée
  return await db.query.booking.findMany({
    where: whereCondition,
    with: BOOKING_RELATIONS,
  });
};

/**
 * Construit la condition where pour un hôte
 */
function buildHostWhereCondition(userId: string, statuses: BookingStatus[]) {
  return (booking: any, { eq, exists, inArray }: any) =>
    exists(
      db
        .select()
        .from(room)
        .where(
          and(
            eq(room.id, booking.roomId),
            eq(room.authorId, userId),
            inArray(booking.status, statuses),
          ),
        ),
    );
}

/**
 * Construit la condition where pour un invité
 */
function buildGuestWhereCondition(userId: string, statuses: BookingStatus[]) {
  return (booking: any, { eq, inArray }: any) =>
    and(eq(booking.guestId, userId), inArray(booking.status, statuses));
}
