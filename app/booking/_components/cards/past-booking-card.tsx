import Image from "next/image";

import { StatusBadge } from "../status-badge";

import { formatDate } from "@/lib/utils/date";
import { Card, CardContent } from "@/components/ui/card";
import { BookingWithRelations, BookingStatus } from "@/types";

export function PastBookingCard({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  return (
    <Card className="border rounded-xl hover:shadow-sm transition p-0">
      <CardContent className="p-2">
        <div className="flex items-center gap-3">
          {/* Image vignette */}
          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              fill
              alt={booking.room.title}
              className="object-cover"
              sizes="64px"
              src={booking.room.medias[0].path}
            />
          </div>
          {/* Infos + Status centré verticalement */}
          <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="text-sm font-medium truncate"
                title={booking.room.title}
              >
                {booking.room.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
              </p>
            </div>
            <StatusBadge status={booking.status as BookingStatus} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
