"use client";

import type { Booking } from "@/types";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star, User, Euro, ArrowRight } from "lucide-react";

import { StatusBadge } from "../status-badge";
import { eurFmt, formatDate } from "../utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CancelBookingDialog from "@/app/booking/_components/dialogs/cancel-booking-dialog";

function nightsBetween(start: string, end: string) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const startUTC = Date.UTC(y1, m1 - 1, d1);
  const endUTC = Date.UTC(y2, m2 - 1, d2);
  const diff = Math.max(0, endUTC - startUTC);

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * ActiveBookingCard — style épuré, classe et accessible
 * - Respecte le thème clair/sombre via les tokens shadcn (bg-card, text-card-foreground, border, muted, etc.)
 * - Hiérarchie visuelle minimale, focus rings nets, ombres douces
 * - Layout responsive (image fixe à gauche sur lg+, stack sur mobile)
 */
export function ActiveBookingCard({ booking }: { booking: Booking }) {
  const nights = nightsBetween(booking.startDate, booking.endDate);
  const total = booking.bargain.price * nights;

  return (
    <Card
      aria-label={`Réservation pour ${booking.bargain.title}`}
      className="group p-0 overflow-hidden rounded-2xl border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50 shadow-sm transition-shadow duration-200 hover:shadow-[0_8px_30px_hsl(var(--border)/0.25)]"
    >
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
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <Link
                  aria-label={`Voir l'annonce ${booking.bargain.title}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
                  href={`/bargain/${booking.bargain.id}`}
                >
                  <h3 className="text-lg font-semibold tracking-tight text-card-foreground line-clamp-2 hover:text-primary transition-colors">
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
                      <span className="font-medium tabular-nums">
                        {booking.bargain.rating}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6 ring-1 ring-border/60">
                    <AvatarImage
                      alt={booking.bargain.author.name}
                      src={booking.bargain.author.avatarUrl}
                    />
                    <AvatarFallback>
                      <User aria-hidden="true" className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    Hébergé par{" "}
                    <span className="font-medium text-foreground/90">
                      {booking.bargain.author.name}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={booking.status} />
              </div>
            </div>

            {/* Info blocks */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border/60 p-3">
                <Calendar
                  aria-hidden="true"
                  className="h-5 w-5 text-muted-foreground mt-0.5"
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
                  className="h-5 w-5 text-muted-foreground mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium leading-none">Prix total</p>
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
            <div className="mt-5 flex flex-col sm:flex-row gap-2">
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
              <CancelBookingDialog booking={booking} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
