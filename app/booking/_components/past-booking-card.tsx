import Image from "next/image";

import { formatDate } from "./utils";
import { StatusBadge } from "./status-badge";

import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types";

export function PastBookingCard({ booking }: { booking: Booking }) {
  return (
    <Card className="opacity-75 hover:opacity-100 transition-opacity">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              fill
              alt={booking.bargain.title}
              className="object-cover rounded-lg"
              sizes="80px"
              src={booking.bargain.images[0]}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-1">
              {booking.bargain.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
