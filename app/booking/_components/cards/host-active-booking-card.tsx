"use client";

import type { Booking } from "@/types";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  User,
  Euro,
  ArrowRight,
  X,
} from "lucide-react";

import { StatusBadge } from "../status-badge";
import { eurFmt, formatDate } from "../utils";
import HostBookingDialog from "../dialogs/host-booking-dialog";
import CancelBookingDialog from "../dialogs/cancel-booking-dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * 📌 HostActiveBookingCard — version "classe & minimaliste"
 * - Palette via tokens shadcn (bg-card, text-card-foreground, border, muted)
 * - Bords arrondis doux, ombres légères, focus rings nets
 * - Layout responsive identique à la carte "voyageur" pour cohérence
 */
export type HostActiveBookingCardProps = {
  booking: Booking & {
    guest?: { id: string | number; name: string; avatarUrl?: string } | null;
  };
  onAccept?: (bookingId: Booking["id"]) => Promise<void>;
  onDecline?: (bookingId: Booking["id"]) => Promise<void>;
  onCancel?: (bookingId: Booking["id"]) => Promise<void>;
};

function nightsBetween(start: string, end: string) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const startUTC = Date.UTC(y1, m1 - 1, d1);
  const endUTC = Date.UTC(y2, m2 - 1, d2);
  const diff = Math.max(0, endUTC - startUTC);

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function HostActiveBookingCard({
  booking,
  onAccept,
  onDecline,
  onCancel,
}: HostActiveBookingCardProps) {
  const nights = nightsBetween(booking.startDate, booking.endDate);
  const total = booking.bargain.price * nights;

  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState<Booking["status"]>(
    booking.status,
  );

  const canAcceptDecline = localStatus === "pending";
  const canCancel = localStatus === "confirmed";

  const run = (fn?: (id: Booking["id"]) => Promise<void>) => () => {
    if (!fn) return;
    startTransition(async () => {
      try {
        await fn(booking.id);
        if (fn === onAccept) setLocalStatus("confirmed");
        if (fn === onDecline) setLocalStatus("declined" as Booking["status"]);
        if (fn === onCancel) setLocalStatus("cancelled");
      } catch {
        // TODO: toaster d'erreur shadcn
      }
    });
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50 shadow-sm transition-shadow duration-200 hover:shadow-[0_8px_30px_hsl(var(--border)/0.25)] p-0">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative w-full lg:w-80 aspect-[16/10] lg:aspect-auto lg:h-auto flex-shrink-0">
            <Image
              fill
              alt={booking.bargain.title}
              className="object-cover w-full h-full transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
              priority={false}
              sizes="(max-width: 1024px) 100vw, 320px"
              src={booking.bargain.images[0]}
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 lg:p-6">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <Link
                  aria-label={`Voir l'annonce ${booking.bargain.title}`}
                  className="block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  href={`/bargain/${booking.bargain.id}`}
                >
                  <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-card-foreground transition-colors hover:text-primary">
                    {booking.bargain.title}
                  </h3>
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    <span>
                      {booking.bargain.city}
                      {booking.bargain.neighborhood
                        ? `, ${booking.bargain.neighborhood}`
                        : ""}
                    </span>
                  </div>
                  {booking.bargain.rating ? (
                    <div className="inline-flex items-center gap-1.5">
                      <Star
                        aria-hidden="true"
                        className="h-4 w-4 fill-current"
                      />
                      <span className="tabular-nums font-medium">
                        {booking.bargain.rating}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Invité */}
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6 ring-1 ring-border/60">
                    <AvatarImage
                      alt={booking.guest.name}
                      src={booking.guest.avatarUrl}
                    />
                    <AvatarFallback>
                      <User aria-hidden="true" className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    Demande par{" "}
                    <span className="text-foreground/90 font-medium">
                      {booking.guest.name}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={localStatus} />
              </div>
            </div>

            {/* Info blocks */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border/60 p-3">
                <Calendar
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 text-muted-foreground"
                />
                <div>
                  <p className="text-sm font-medium leading-none">
                    Dates de séjour
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(booking.startDate)} —{" "}
                    {formatDate(booking.endDate)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {nights} nuit{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 p-3">
                <Euro
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 text-muted-foreground"
                />
                <div>
                  <p className="text-sm font-medium leading-none">
                    Revenu estimé
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">
                    {eurFmt.format(total)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {eurFmt.format(booking.bargain.price)} / nuit
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link className="flex-1" href={`/bargain/${booking.bargain.id}`}>
                <Button
                  aria-label="Voir les détails de l'annonce"
                  className="w-full justify-center rounded-xl border-border/70 shadow-none hover:shadow-sm"
                  variant="outline"
                >
                  Voir les détails
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                </Button>
              </Link>

              {canAcceptDecline && (
                <div className="flex flex-1 gap-2">
                  <HostBookingDialog booking={booking} />

                  <ConfirmButton
                    actionLabel="Refuser"
                    description="La demande sera refusée et l'invité sera notifié."
                    icon={<X className="h-4 w-4" />}
                    intent="danger-outline"
                    loading={isPending}
                    title="Refuser la réservation ?"
                    onConfirm={run(onDecline)}
                  />
                </div>
              )}

              {canCancel && <CancelBookingDialog booking={booking} />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Minimal confirm button + alert dialog ----------------------------------

type ConfirmButtonProps = {
  title: string;
  description: string;
  actionLabel: string;
  onConfirm?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  /**
   * intent:
   * - "confirm" -> bouton primaire sobre
   * - "danger-outline" -> bouton ghost/outline destructif minimal
   */
  intent?: "confirm" | "danger-outline";
};

function ConfirmButton({
  title,
  description,
  actionLabel,
  onConfirm,
  loading,
  icon,
  intent = "confirm",
}: ConfirmButtonProps) {
  const triggerClasses =
    intent === "confirm"
      ? "rounded-xl shadow-none hover:shadow-sm"
      : "rounded-xl border border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/50";

  const triggerVariant = intent === "confirm" ? "default" : "ghost";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`flex-1 ${triggerClasses}`}
          disabled={loading}
          variant={triggerVariant as any}
        >
          {icon}
          <span className={icon ? "ml-2" : ""}>{actionLabel}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border-border/60">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-lg">Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-lg"
            disabled={loading}
            onClick={onConfirm}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
