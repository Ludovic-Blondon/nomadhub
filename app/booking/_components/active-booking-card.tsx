"use client";

import type { Booking } from "@/types";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star, User, Euro, ArrowRight } from "lucide-react";

import { StatusIcon } from "./status-icon";
import { StatusBadge } from "./status-badge";
import { eurFmt, formatDate } from "./utils";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function nightsBetween(start: string, end: string) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const startUTC = Date.UTC(y1, m1 - 1, d1);
  const endUTC = Date.UTC(y2, m2 - 1, d2);
  const diff = Math.max(0, endUTC - startUTC);

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function ActiveBookingCard({ booking }: { booking: Booking }) {
  const nights = nightsBetween(booking.startDate, booking.endDate);
  const total = booking.bargain.price * nights;

  return (
    <Card className="overflow-hidden transition-all duration-200 border-0 shadow-sm hover:shadow-md">
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
              <StatusBadge status={booking.status} />
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

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      alt={booking.bargain.author.name}
                      src={booking.bargain.author.avatarUrl}
                    />
                    <AvatarFallback>
                      <User className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Hébergé par {booking.bargain.author.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <StatusIcon status={booking.status} />
              </div>
            </div>

            <Separator className="mb-4" />

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
                  <p className="text-sm font-medium">Prix total</p>
                  <p className="text-lg font-bold">{eurFmt.format(total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {eurFmt.format(booking.bargain.price)} / nuit
                  </p>
                </div>
              </div>
            </div>

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
              {booking.status === "pending" && (
                <Button
                  aria-label="Gérer la réservation"
                  className="flex-1"
                  variant="default"
                >
                  Gérer la réservation
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
