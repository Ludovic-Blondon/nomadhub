"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Loader2Icon,
  CheckCircle2,
  CalendarDays,
  Mail,
  Bell,
  Home,
  User,
  Clock,
  Euro,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bargain } from "@/types";

type BookingState = "selecting" | "loading" | "confirmed";

export function BookingDialog({ bargain }: { bargain: Bargain }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>("selecting");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (
      !dateRange ||
      !dateRange.from ||
      !dateRange.to ||
      dateRange.from === dateRange.to
    ) {
      setError("Veuillez sélectionner une date de début et une date de fin.");

      return;
    }

    setError(null);
    setBookingState("loading");

    // Simulation de l'envoi de la réservation
    setTimeout(() => {
      setBookingState("confirmed");
    }, 2000);
  };

  const handleReset = () => {
    setBookingState("selecting");
    setDateRange(undefined);
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset après fermeture pour la prochaine ouverture
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  // Formatage des dates pour l'affichage
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Calcul du nombre de nuits
  const calculateNights = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(
      dateRange.to.getTime() - dateRange.from.getTime(),
    );

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Désactiver les dates antérieures à aujourd'hui
  const today = new Date();
  const disabledDays = { before: today };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Réserver sur le site</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[95vh] p-4">
        <DialogHeader className="mb-2">
          <DialogTitle>
            {bargain.title} à {bargain.city}
          </DialogTitle>
          <DialogDescription>
            {bookingState === "selecting" && "Sélectionnez vos dates de séjour"}
            {bookingState === "loading" && "Traitement de votre demande..."}
            {bookingState === "confirmed" && "Demande de réservation envoyée"}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          {/* État de sélection des dates */}
          {bookingState === "selecting" && (
            <>
              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Calendar
                className="rounded-lg border shadow-sm w-full"
                defaultMonth={dateRange?.from || today}
                disabled={disabledDays}
                mode="range"
                numberOfMonths={2}
                selected={dateRange}
                onSelect={setDateRange}
              />

              {dateRange?.from &&
                dateRange?.to &&
                dateRange.from !== dateRange.to && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Période sélectionnée:
                      </span>
                      <span className="font-medium">
                        {formatDate(dateRange.from)} -{" "}
                        {formatDate(dateRange.to)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">
                        Nombre de nuits:
                      </span>
                      <span className="font-medium">
                        {calculateNights()} nuit(s)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">
                        Prix total estimé:
                      </span>
                      <span className="font-medium">
                        {bargain.price * calculateNights()} €
                      </span>
                    </div>
                  </div>
                )}
            </>
          )}

          {/* État de chargement */}
          {bookingState === "loading" && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2Icon className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">
                Envoi de votre demande de réservation...
              </p>
            </div>
          )}

          {/* État de confirmation */}
          {bookingState === "confirmed" && (
            <div className="space-y-6">
              {/* Message de succès */}
              <div className="flex flex-col items-center text-center py-8">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                  <CheckCircle2 className="h-16 w-16 text-green-500 relative" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Demande de réservation envoyée !
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Votre demande a été transmise à l&apos;hôte. Vous recevrez une
                  notification dès que votre réservation sera confirmée.
                </p>
              </div>

              {/* Récapitulatif de la réservation */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Détails de votre demande
                </h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {bargain.title} à {bargain.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Du {dateRange?.from && formatDate(dateRange.from)} au{" "}
                      {dateRange?.to && formatDate(dateRange.to)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{calculateNights()} nuit(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {bargain.price * calculateNights()} € prix total estimé
                    </span>
                  </div>
                </div>
              </div>

              {/* Prochaines étapes */}
              <div className="space-y-3">
                <h4 className="font-medium">Prochaines étapes</h4>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">En attente de confirmation</p>
                      <p className="text-muted-foreground">
                        L&apos;hôte dispose de 24h pour accepter ou refuser
                        votre demande
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Notification par email</p>
                      <p className="text-muted-foreground">
                        Vous recevrez un email dès que l&apos;hôte aura répondu
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Suivi sur le site</p>
                      <p className="text-muted-foreground">
                        Consultez l&apos;état de votre réservation dans votre
                        espace personnel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-2">
          {bookingState === "selecting" && (
            <>
              <DialogClose asChild>
                <Button className="cursor-pointer" variant="outline">
                  Annuler
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="button"
                onClick={handleSubmit}
              >
                Envoyer la demande
              </Button>
            </>
          )}

          {bookingState === "confirmed" && (
            <Button className="cursor-pointer" onClick={handleClose}>
              Retourner sur le site
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
