"use client";

import { ActiveBookingCard } from "./cards/active-booking-card";
import { PastBookingCard } from "./cards/past-booking-card";
import { HostActiveBookingCard } from "./cards/host-active-booking-card";
import EmptyState from "./empty-state";

export function ReservationList({
  role,
  scope,
  list,
}: {
  role: "guest" | "host";
  scope: "active" | "past";
  list: any[];
}) {
  if (list.length === 0) {
    const title =
      scope === "active"
        ? role === "host"
          ? "Aucune réservation active côté hôte"
          : "Aucune réservation active"
        : role === "host"
          ? "Aucun historique côté hôte"
          : "Aucun historique";

    const description =
      scope === "active"
        ? role === "host"
          ? "Les demandes et séjours confirmés apparaîtront ici lorsque vous êtes hôte."
          : "Vos réservations en cours apparaîtront ici."
        : role === "host"
          ? "Vos séjours terminés ou annulés côté hôte apparaîtront ici."
          : "Vos réservations passées apparaîtront ici.";

    return <EmptyState description={description} title={title} />;
  }

  return (
    <div className="space-y-4">
      {list.map((booking) =>
        scope === "active" ? (
          role === "host" ? (
            <HostActiveBookingCard
              key={`${role}-${booking.id}`}
              booking={booking}
            />
          ) : (
            <ActiveBookingCard
              key={`${role}-${booking.id}`}
              booking={booking}
            />
          )
        ) : (
          <PastBookingCard key={`${role}-${booking.id}`} booking={booking} />
        ),
      )}
    </div>
  );
}
