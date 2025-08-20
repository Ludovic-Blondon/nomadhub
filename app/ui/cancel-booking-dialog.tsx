"use client";

import type { Booking } from "@/types";

import { useState } from "react";

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

type CancelBookingState = "pending" | "loading" | "cancelled";

export default function CancelBookingDialog({ booking }: { booking: Booking }) {
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
          aria-label="Annuler la réservation"
          className="flex-1"
          variant="destructive"
        >
          Annuler la réservation
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 max-w-[100vw] sm:max-w-[720px] h-[100svh] sm:h-auto sm:min-h-[0] sm:rounded-xl rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 sm:p-6">
          <DialogHeader className="space-y-1 p-0">
            <DialogTitle className="text-base sm:text-lg">
              Confirmer l&apos;annulation
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4">
          {bookingState === "pending" && (
            <div className="space-y-4 text-sm">
              <div className="grid gap-2">
                <Row
                  label="Période"
                  value={`${booking.startDate} → ${booking.endDate}`}
                />
                <Row label="Offre" value={booking.bargain.title} />
                <Row label="Ville" value={booking.bargain.city} />
              </div>
              <p className="text-muted-foreground">
                Si vous continuez, la réservation passera à l&apos;état &quot;
                annulée&quot; et ne pourra pas être rétablie.
              </p>
            </div>
          )}

          {bookingState === "loading" && (
            <div aria-live="polite" className="flex items-center gap-3 py-8">
              <div
                aria-hidden="true"
                className="h-5 w-5 rounded-full border border-foreground/60 border-t-transparent animate-spin"
              />
              <p className="text-sm text-muted-foreground">
                Annulation en cours…
              </p>
            </div>
          )}

          {bookingState === "cancelled" && (
            <div className="py-8">
              <p className="text-sm">Votre réservation a été annulée.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 sm:p-4">
          <DialogFooter className="gap-2 sm:gap-3">
            {bookingState === "pending" && (
              <div className="w-full grid grid-cols-1 gap-2 sm:flex sm:justify-end">
                <DialogClose asChild>
                  <Button className="w-full sm:w-auto" variant="outline">
                    Retour
                  </Button>
                </DialogClose>
                <Button
                  aria-label="Confirmer l'annulation"
                  className="w-full sm:w-auto"
                  type="button"
                  variant="destructive"
                  onClick={handleSubmit}
                >
                  Confirmer l&apos;annulation
                </Button>
              </div>
            )}

            {bookingState === "loading" && (
              <div className="w-full grid grid-cols-1 gap-2 sm:flex sm:justify-end">
                <Button disabled className="w-full sm:w-auto" variant="outline">
                  En cours…
                </Button>
              </div>
            )}

            {bookingState === "cancelled" && (
              <div className="w-full grid grid-cols-1 gap-2 sm:flex sm:justify-end">
                <Button
                  aria-label="Fermer"
                  className="w-full sm:w-auto"
                  onClick={handleClose}
                >
                  Fermer
                </Button>
              </div>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate font-medium text-right">{value ?? "—"}</span>
    </div>
  );
}
