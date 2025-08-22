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
  Check,
  X,
  Ban,
} from "lucide-react";

import { StatusIcon } from "./status-icon";
import { StatusBadge } from "./status-badge";
import { eurFmt, formatDate } from "./utils";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
 * 📌 HostActiveBookingCard
 * - Vue hôte d'une réservation active.
 * - Cas "pending": boutons Accepter / Refuser
 * - Cas "confirmed": bouton Annuler (côté hôte)
 * - Autres statuts: pas d'actions (affichage passif)
 *
 * Intégration serveur:
 * - Passe des handlers `onAccept`, `onDecline`, `onCancel` (Server Actions / mutation React Query)
 * - Les handlers doivent retourner une Promise; l'UI gère l'état pending.
 */

export type HostActiveBookingCardProps = {
  booking: Booking & {
    // Optionnel: infos invité si dispo côté API
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
        // Optimistic update: bascule le statut suivant l'action
        if (fn === onAccept) setLocalStatus("confirmed");
        if (fn === onDecline) setLocalStatus("declined" as Booking["status"]);
        if (fn === onCancel) setLocalStatus("cancelled");
      } catch {
        // TODO: toaster d'erreur shadcn
      }
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 border-0 shadow-sm hover:shadow-md p-0">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative w-full lg:w-80 h-48 lg:h-auto flex-shrink-0">
            <Image
              fill
              alt={booking.bargain.title}
              className="object-cover w-full h-full"
              priority={false}
              sizes="(max-width: 1024px) 100vw, 320px"
              src={booking.bargain.images[0]}
            />
            <div className="absolute top-3 right-3">
              <StatusBadge status={localStatus} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {booking.bargain.title}
                </CardTitle>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {booking.bargain.city}
                      {booking.bargain.neighborhood
                        ? `, ${booking.bargain.neighborhood}`
                        : ""}
                    </span>
                  </div>
                  {booking.bargain.rating ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {booking.bargain.rating}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Invité (côté hôte) */}
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      alt={booking.guest?.name || "Invité"}
                      src={booking.guest?.avatarUrl}
                    />
                    <AvatarFallback>
                      <User className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Demande par {booking.guest?.name || "Invité"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <StatusIcon status={localStatus} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Dates de séjour</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.startDate)} -{" "}
                    {formatDate(booking.endDate)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {nights} nuit{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Euro className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Revenu estimé</p>
                  <p className="text-lg font-bold">{eurFmt.format(total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {eurFmt.format(booking.bargain.price)} / nuit
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link className="flex-1" href={`/bargain/${booking.bargain.id}`}>
                <Button
                  aria-label="Voir les détails de l'annonce"
                  className="w-full group"
                  variant="outline"
                >
                  Voir les détails
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {canAcceptDecline && (
                <div className="flex flex-1 gap-2">
                  <ConfirmButton
                    actionLabel="Accepter"
                    description="Le séjour passera au statut confirmé et l'invité sera notifié."
                    icon={<Check className="w-4 h-4" />}
                    loading={isPending}
                    title="Accepter la réservation ?"
                    variant="default"
                    onConfirm={run(onAccept)}
                  />

                  <ConfirmButton
                    actionLabel="Refuser"
                    description="La demande sera refusée et l'invité sera notifié."
                    icon={<X className="w-4 h-4" />}
                    loading={isPending}
                    title="Refuser la réservation ?"
                    variant="destructive"
                    onConfirm={run(onDecline)}
                  />
                </div>
              )}

              {canCancel && (
                <ConfirmButton
                  actionLabel="Annuler"
                  description="Cette action annulera la réservation confirmée. Des pénalités peuvent s'appliquer selon vos conditions."
                  icon={<Ban className="w-4 h-4" />}
                  loading={isPending}
                  title="Annuler en tant qu'hôte ?"
                  variant="destructive"
                  onConfirm={run(onCancel)}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Small generic confirm dialog button ----------------------------------

type ConfirmButtonProps = {
  title: string;
  description: string;
  actionLabel: string;
  onConfirm?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

function ConfirmButton({
  title,
  description,
  actionLabel,
  onConfirm,
  loading,
  icon,
  variant = "default",
}: ConfirmButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-1" disabled={loading} variant={variant}>
          {icon}
          <span className={icon ? "ml-2" : ""}>{actionLabel}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={onConfirm}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
