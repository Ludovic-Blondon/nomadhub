"use client";

import type { BookingWithRelations } from "@/types";

import { useState } from "react";
import { X } from "lucide-react";

import { refuseBookingAction } from "../actions/refuse-booking-action";

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

type RefuseBookingState = "pending" | "loading" | "refused" | "error";

export default function RefuseBookingDialog({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const [bookingState, setBookingState] =
    useState<RefuseBookingState>("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setBookingState("loading");
    try {
      const result = await refuseBookingAction(booking.id);

      if (result.ok) {
        setBookingState("refused");
      } else {
        setErrorMessage(result.message);
        setBookingState("error");
      }
    } catch {
      setErrorMessage("Erreur lors du refus");
      setBookingState("error");
    }
  };

  const handleReset = () => {
    setBookingState("pending");
    setErrorMessage("");
  };
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => handleReset(), 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex-1 rounded-xl border border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/50"
          variant="ghost"
        >
          <X className="h-4 w-4" />
          <span className="ml-2">Refuser</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 max-w-[100vw] sm:max-w-md h-[100svh] sm:h-auto rounded-none sm:rounded-lg overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border/50">
          <DialogTitle className="text-lg font-medium">
            Refuser la réservation
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

          {bookingState === "refused" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-sm font-medium">Réservation refusée</p>
            </div>
          )}

          {bookingState === "error" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-center">
                {errorMessage || "Erreur lors du refus"}
              </p>
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
                  variant="destructive"
                  onClick={handleSubmit}
                >
                  Refuser
                </Button>
              </>
            )}
            {bookingState === "error" && (
              <>
                <Button
                  className="w-full sm:w-auto"
                  variant="outline"
                  onClick={() => setBookingState("pending")}
                >
                  Réessayer
                </Button>
                <Button className="w-full sm:w-auto" onClick={handleClose}>
                  Fermer
                </Button>
              </>
            )}
            {(bookingState === "refused" || bookingState === "loading") && (
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
