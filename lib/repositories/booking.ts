import type { Role, Scope } from "@/types";

import { Session } from "better-auth";
import { and, exists, asc, desc } from "drizzle-orm";

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

  const orderBy =
    scope === "active"
      ? (fields: any) => asc(fields.startDate)
      : (fields: any) => desc(fields.startDate);

  if (role === "host") {
    return await db.query.booking.findMany({
      where: (booking, { eq, inArray }) =>
        and(
          exists(
            db
              .select()
              .from(room)
              .where(
                and(eq(room.id, booking.roomId), eq(room.authorId, userId)),
              ),
          ),
          inArray(booking.status, statuses),
        ),
      with: BOOKING_RELATIONS,
      orderBy,
    });
  }

  // Pour les invités
  return await db.query.booking.findMany({
    where: (booking, { eq, inArray }) =>
      and(eq(booking.guestId, userId), inArray(booking.status, statuses)),
    with: BOOKING_RELATIONS,
    orderBy,
  });
};
