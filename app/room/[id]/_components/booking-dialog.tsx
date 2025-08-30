"use client";

import type { Room } from "@/types";

import { useEffect, useState } from "react";
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

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches("matches" in e ? e.matches : (e as MediaQueryList).matches);
    };

    onChange(mql);
    mql.addEventListener?.("change", onChange as any);

    return () => mql.removeEventListener?.("change", onChange as any);
  }, [query]);

  return matches;
}

type BookingState = "selecting" | "loading" | "confirmed";

type BookingDialogProps = {
  room: Room;
};

export function BookingDialog({ room }: BookingDialogProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>("selecting");
  const [isOpen, setIsOpen] = useState(false);

  const isSmUp = useMediaQuery("(min-width: 640px)");
  const isLgUp = useMediaQuery("(min-width: 1024px)");
  const monthsToShow = isSmUp ? (isLgUp ? 3 : 2) : 1;

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const disabledDays = { before: startOfToday } as const;

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  const calculateNights = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(
      dateRange.to.getTime() - dateRange.from.getTime()
    );

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = () => {
    if (!dateRange?.from || !dateRange?.to || dateRange.from === dateRange.to) {
      setError("Veuillez sélectionner une date de début et une date de fin.");

      return;
    }
    setError(null);
    setBookingState("loading");
    setTimeout(() => setBookingState("confirmed"), 1200);
  };

  const handleReset = () => {
    setBookingState("selecting");
    setDateRange(undefined);
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => handleReset(), 300);
  };

  const nights = calculateNights();
  const estimatedTotal = nights * room.price;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Réserver sur le site</Button>
      </DialogTrigger>

      <DialogContent className="w-full p-0 max-w-[100vw] sm:max-w-[900px] lg:max-w-[1000px] h-[100svh] sm:h-[90vh] lg:h-[85vh] sm:rounded-xl rounded-t-2xl flex flex-col overflow-hidden">
        <div className="flex-shrink-0 border-b bg-background p-4 sm:p-6 sm:pb-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base sm:text-xl">
              {room.title} à {room.city}
            </DialogTitle>
            <DialogDescription>
              {bookingState === "selecting" &&
                "Sélectionnez vos dates de séjour"}
              {bookingState === "loading" && "Traitement de votre demande..."}
              {bookingState === "confirmed" && "Demande de réservation envoyée"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 min-h-0">
          {bookingState === "selecting" && (
            <>
              {error && (
                <Alert className="mb-3" role="alert" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Calendar
                className="rounded-lg border shadow-sm w-full mx-auto sm:max-w-none"
                defaultMonth={dateRange?.from || startOfToday}
                disabled={disabledDays}
                mode="range"
                numberOfMonths={monthsToShow}
                pagedNavigation={isSmUp}
                selected={dateRange}
                onSelect={setDateRange}
              />

              {/* Recap dates visible uniquement sur desktop */}
              {dateRange?.from &&
                dateRange?.to &&
                dateRange.from !== dateRange.to && (
                  <div className="hidden sm:block mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Période sélectionnée
                      </span>
                      <span className="font-medium">
                        {formatDate(dateRange.from)} –{" "}
                        {formatDate(dateRange.to)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">
                        Nombre de nuits
                      </span>
                      <span className="font-medium">{nights} nuit(s)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">
                        Prix total estimé
                      </span>
                      <span className="font-medium">
                        {estimatedTotal.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                  </div>
                )}
            </>
          )}

          {bookingState === "loading" && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2Icon
                aria-hidden="true"
                className="h-12 w-12 animate-spin text-primary mb-4"
              />
              <p className="text-muted-foreground">
                Envoi de votre demande de réservation…
              </p>
            </div>
          )}

          {bookingState === "confirmed" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center py-8">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse motion-reduce:animate-none" />
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-16 w-16 text-green-500 relative"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Demande de réservation envoyée !
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {isSmUp
                    ? "Votre demande a été transmise à l’hôte. Vous recevrez une notification dès que votre réservation sera confirmée."
                    : "Demande envoyée. Vous serez notifié à la confirmation."}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  Détails de votre demande
                </h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Home
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span>
                      {room.title} à {room.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span>
                      Du {dateRange?.from && formatDate(dateRange.from)} au{" "}
                      {dateRange?.to && formatDate(dateRange.to)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span>{nights} nuit(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span>
                      {estimatedTotal.toLocaleString("fr-FR")} € prix total
                      estimé
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Prochaines étapes</h4>

                <div className="space-y-2 sm:hidden">
                  <div className="flex gap-3">
                    <Clock
                      aria-hidden="true"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">En attente de confirmation</p>
                      <p className="text-muted-foreground">
                        Réponse de l’hôte sous 24h.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Bell
                      aria-hidden="true"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">Notification</p>
                      <p className="text-muted-foreground">
                        Email + suivi depuis votre compte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block space-y-2">
                  <div className="flex gap-3">
                    <Clock
                      aria-hidden="true"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">En attente de confirmation</p>
                      <p className="text-muted-foreground">
                        L’hôte dispose de 24h pour accepter ou refuser votre
                        demande
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail
                      aria-hidden="true"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">Notification par email</p>
                      <p className="text-muted-foreground">
                        Vous recevrez un email dès que l’hôte aura répondu
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Bell
                      aria-hidden="true"
                      className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">Suivi sur le site</p>
                      <p className="text-muted-foreground">
                        Consultez l’état de votre réservation dans votre espace
                        personnel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 border-t bg-background p-3 sm:p-4 sm:pt-4">
          <DialogFooter className="gap-2 sm:gap-3">
            {bookingState === "selecting" && (
              <div className="w-full grid grid-cols-1 gap-2 items-center sm:flex sm:justify-end">
                {/* Bloc récap toujours visible sur mobile */}
                <div className="flex items-center justify-between gap-3 rounded-md border p-3 sm:hidden">
                  <div className="text-xs text-muted-foreground">
                    {dateRange?.from && dateRange?.to
                      ? "Sélection"
                      : "Aucune date"}
                  </div>
                  <div className="text-right text-sm font-medium truncate">
                    {dateRange?.from &&
                    dateRange?.to &&
                    dateRange.from !== dateRange.to
                      ? `${formatDate(dateRange.from)} – ${formatDate(dateRange.to)}`
                      : "Choisissez une période"}
                  </div>
                </div>

                <DialogClose asChild>
                  <Button
                    className="cursor-pointer w-full sm:w-auto sm:justify-self-start sm:h-9 sm:px-3 sm:text-sm sm:rounded-md"
                    variant="outline"
                  >
                    Annuler
                  </Button>
                </DialogClose>

                <Button
                  aria-label="Envoyer la demande de réservation"
                  className="cursor-pointer w-full sm:w-auto"
                  type="button"
                  onClick={handleSubmit}
                >
                  Envoyer la demande
                </Button>
              </div>
            )}

            {bookingState === "confirmed" && (
              <Button
                aria-label="Fermer et retourner sur le site"
                className="cursor-pointer w-full sm:w-auto"
                onClick={handleClose}
              >
                Retourner sur le site
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
