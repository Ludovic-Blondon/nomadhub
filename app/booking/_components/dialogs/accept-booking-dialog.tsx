"use client";

import type { BookingWithRelations } from "@/types";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CancelBookingState = "pending" | "loading" | "cancelled";

export default function AcceptBookingDialog({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const [bookingState, setBookingState] =
    useState<CancelBookingState>("pending");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    setBookingState("loading");
    // TODO: Call API to cancel booking
    setTimeout(() => setBookingState("cancelled"), 900);
  };

  const handleReset = () => setBookingState("pending");
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => handleReset(), 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 rounded-xl shadow-none hover:shadow-sm"
          variant="default"
        >
          <Check className="h-4 w-4" />
          <span className="ml-2">Accepter</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 max-w-[100vw] sm:max-w-md h-[100svh] sm:h-auto rounded-none sm:rounded-lg overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border/50">
          <DialogTitle className="text-lg font-medium">
            Accepter la réservation
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6">
          {bookingState === "pending" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <div className="text-sm text-muted-foreground font-medium min-w-0 flex-shrink-0">
                      Invité:
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-sm font-medium">
                        {booking.guest.name}
                      </div>
                      <Avatar>
                        <AvatarImage src={booking.guest.image || undefined} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <InfoRow
                  label="Période"
                  value={`${booking.startDate.toDateString()} → ${booking.endDate.toDateString()}`}
                />
                <InfoRow label="Offre" value={booking.room.title} />
                <InfoRow label="Ville" value={booking.room.city} />
              </div>
            </div>
          )}

          {bookingState === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-8 w-8 rounded-full border-2 border-muted border-t-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">
                Traitement en cours…
              </p>
            </div>
          )}

          {bookingState === "cancelled" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-sm font-medium">Réservation acceptée</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border/50 bg-muted/20">
          <DialogFooter className="space-y-2 sm:space-y-0">
            {bookingState === "pending" && (
              <>
                <DialogClose asChild>
                  <Button className="w-full sm:w-auto" variant="outline">
                    Retour
                  </Button>
                </DialogClose>
                <Button
                  className="w-full sm:w-auto"
                  variant="default"
                  onClick={handleSubmit}
                >
                  Accepter
                </Button>
              </>
            )}
            {bookingState !== "pending" && (
              <Button
                className="w-full sm:w-auto"
                disabled={bookingState === "loading"}
                onClick={handleClose}
              >
                Fermer
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start gap-4 py-2">
      <span className="text-sm text-muted-foreground font-medium min-w-0 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-right min-w-0 flex-1">
        {value ?? "—"}
      </span>
    </div>
  );
}
