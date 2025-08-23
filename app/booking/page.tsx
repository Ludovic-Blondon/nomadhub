"use client";

import type { Booking } from "@/types";

import React, { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Clock, Home, User, History } from "lucide-react";

import { ActiveBookingCard } from "./_components/active-booking-card";
import { PastBookingCard } from "./_components/past-booking-card";
import { HostActiveBookingCard } from "./_components/host-active-booking-card";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Refonte: une seule barre de filtres (sobre & minimaliste)
 * - Segmented switch rôle (Voyageur / Hôte)
 * - Chips de statut (Actives / Historique) avec compteurs
 * - Layout unique (pas de Tabs imbriqués)
 * - URL = source of truth (?role=guest|host&scope=active|past)
 * - Mémoire locale pour chaque rôle + scope
 */

const guestBookings: Booking[] = [
  {
    id: 1,
    status: "pending",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    bargain: {
      id: 1,
      title: "Magnifique canapé lit chez William - Salon",
      city: "Paris",
      neighborhood: "1er arrondissement",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
      price: 20,
      images: [
        "/images/pexels-chaitaastic-1918291-optimized.jpeg",
        "/images/pexels-fotoaibe-813692-optimized.jpeg",
        "/images/pexels-fotoaibe-1571460-optimized.jpeg",
        "/images/pexels-fotoaibe-1571468-optimized.jpeg",
        "/images/pexels-fotoaibe-1643384-optimized.jpeg",
      ],
      reviews: [
        {
          id: "1",
          rating: 4.5,
          title: "Très bon produit",
          body: "Qualité au rendez-vous, livraison rapide.",
          createdAt: "2025-08-01T10:00:00.000Z",
          author: { name: "Marie Dupont" },
        },
        {
          id: "2",
          rating: 3,
          body: "Fait le job, mais peut mieux faire.",
          createdAt: "2025-08-10T12:30:00.000Z",
          author: { name: "Alex Martin" },
        },
      ],
      author: { name: "John Doe", avatarUrl: "https://github.com/shadcn.png" },
    },
  },
  {
    id: 2,
    status: "confirmed",
    startDate: "2025-08-28",
    endDate: "2025-08-30",
    bargain: {
      id: 2,
      title: "Studio cozy au cœur de Montmartre",
      city: "Paris",
      neighborhood: "18e arrondissement",
      rating: 4.8,
      price: 45,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Sophie Martin",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
  },
  {
    id: 3,
    status: "cancelled",
    startDate: "2024-11-20",
    endDate: "2024-11-22",
    bargain: {
      id: 3,
      title: "Appartement moderne près de la gare",
      city: "Lyon",
      neighborhood: "Part-Dieu",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Pierre Dubois",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
  },
  {
    id: 4,
    status: "completed",
    startDate: "2024-12-01",
    endDate: "2024-12-02",
    bargain: {
      id: 4,
      title: "Magnifique canapé lit chez William - Salon",
      city: "Paris",
      neighborhood: "1er arrondissement",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Pierre Dubois",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
  },
  {
    id: 5,
    status: "rejected",
    startDate: "2024-12-01",
    endDate: "2024-12-02",
    bargain: {
      id: 4,
      title: "Magnifique canapé lit chez Jean - Salon",
      city: "Lyon",
      neighborhood: "5e arrondissement",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Jean Dupont",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
  },
];

const hostBookings: Booking[] = [
  {
    id: 101,
    status: "pending",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    bargain: {
      id: 42,
      title: "Loft lumineux Canal Saint-Martin",
      city: "Paris",
      neighborhood: "10e arrondissement",
      rating: 4.9,
      price: 80,
      images: ["/images/pexels-fotoaibe-813692-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Demande en attente : l'hôte peut accepter ou refuser la réservation.",
    },
  },
  {
    id: 102,
    status: "rejected",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    bargain: {
      id: 43,
      title: "T2 design proche Bellecour",
      city: "Lyon",
      neighborhood: "2e arrondissement",
      rating: 4.6,
      price: 65,
      images: ["/images/pexels-fotoaibe-1571460-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description: "Demande refusée : l'hôte a refusé la réservation.",
    },
  },
  {
    id: 104,
    status: "confirmed",
    startDate: "2025-09-18",
    endDate: "2025-09-20",
    bargain: {
      id: 45,
      title: "T2 design proche Bellecour",
      city: "Lyon",
      neighborhood: "2e arrondissement",
      rating: 4.6,
      price: 65,
      images: ["/images/pexels-fotoaibe-1571460-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Séjour confirmé : vous pouvez envoyer des instructions d'arrivée.",
    },
  },
  {
    id: 103,
    status: "completed",
    startDate: "2025-05-02",
    endDate: "2025-05-05",
    bargain: {
      id: 44,
      title: "Studio cosy Vieux-Lille",
      city: "Lille",
      neighborhood: "Vieux-Lille",
      rating: 4.3,
      price: 55,
      images: ["/images/pexels-fotoaibe-1571468-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description: "Séjour achevé : pensez à laisser un avis invité.",
    },
  },
];

// --- Types & helpers -----------------------------------------------------

type Role = "guest" | "host";
type Scope = "active" | "past";

function useQueryState<T extends string>(
  key: string,
  fallback: T,
): [T, (v: T) => void] {
  const router = useRouter();
  const params = useSearchParams();
  const value =
    (params.get(key) as T) ||
    (typeof window !== "undefined" &&
      (localStorage.getItem(`reservations:${key}`) as T)) ||
    fallback;

  const setValue = (v: T) => {
    if (typeof window !== "undefined")
      localStorage.setItem(`reservations:${key}`, v);
    const search = new URLSearchParams(params?.toString());

    search.set(key, v);
    router.replace(`?${search.toString()}`);
  };

  useEffect(() => {
    if (!params.get(key)) setValue(value);
  }, []);

  return [value as T, setValue];
}

function useLists(role: Role) {
  const all = role === "guest" ? guestBookings : hostBookings;
  const active = useMemo(
    () => all.filter((b) => b.status === "pending" || b.status === "confirmed"),
    [all],
  );
  const past = useMemo(
    () =>
      all.filter((b) =>
        ["cancelled", "completed", "rejected"].includes(b.status),
      ),
    [all],
  );

  return { all, active, past };
}

// --- Page ----------------------------------------------------------------

function ReservationsContent() {
  const [role, setRole] = useQueryState<Role>("role", "guest");
  const [scope, setScope] = useQueryState<Scope>("scope", "active");

  const { active, past } = useLists(role);
  const list = scope === "active" ? active : past;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Réservations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Côté voyageur et côté hôte, en un seul endroit.
          </p>
        </div>

        {/* Actions secondaires */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => location.reload()}>
            Actualiser
          </Button>
        </div>
      </div>

      {/* Barre de filtres (segmented + chips) */}
      <Card className="rounded-2xl border border-border/60 bg-card/60 p-2 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Segmented rôle */}
          <div className="inline-flex rounded-xl border border-border/60 p-1">
            <SegmentedItem
              active={role === "guest"}
              onClick={() => setRole("guest")}
            >
              <User className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Voyageur</span>
            </SegmentedItem>
            <SegmentedItem
              active={role === "host"}
              onClick={() => setRole("host")}
            >
              <Home className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Hôte</span>
            </SegmentedItem>
          </div>

          {/* Chips scope */}
          <div className="flex items-center gap-2">
            <ScopeChip
              active={scope === "active"}
              count={active.length}
              icon={<Clock className="h-4 w-4" />}
              label="Actives"
              onClick={() => setScope("active")}
            />
            <ScopeChip
              active={scope === "past"}
              count={past.length}
              icon={<History className="h-4 w-4" />}
              label="Historique"
              onClick={() => setScope("past")}
            />

            <Separator
              className="mx-1 hidden h-5 sm:block"
              orientation="vertical"
            />
          </div>
        </div>
      </Card>

      {/* Contenu list/grid */}
      <div className="mt-6 space-y-4">
        {list.length === 0 ? (
          <EmptyState
            description={
              scope === "active"
                ? role === "host"
                  ? "Les demandes et séjours confirmés apparaîtront ici lorsque vous êtes hôte."
                  : "Vos réservations en cours apparaîtront ici."
                : role === "host"
                  ? "Vos séjours terminés ou annulés côté hôte apparaîtront ici."
                  : "Vos réservations passées apparaîtront ici."
            }
            title={
              scope === "active"
                ? role === "host"
                  ? "Aucune réservation active côté hôte"
                  : "Aucune réservation active"
                : role === "host"
                  ? "Aucun historique côté hôte"
                  : "Aucun historique"
            }
          />
        ) : (
          list.map((booking) =>
            scope === "active" ? (
              role === "host" ? (
                <HostActiveBookingCard
                  key={`${role}-${booking.id}`}
                  booking={booking}
                />
              ) : (
                <ActiveBookingCard
                  key={`${role}-${booking.id}`}
                  booking={booking}
                />
              )
            ) : (
              <PastBookingCard
                key={`${role}-${booking.id}`}
                booking={booking}
              />
            ),
          )
        )}
      </div>
    </div>
  );
}

// --- UI building blocks --------------------------------------------------

function SegmentedItem({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-2 text-sm transition",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-foreground/80 hover:bg-muted/50",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ScopeChip({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
        active
          ? "border-primary/60 bg-primary/10"
          : "border-border/60 hover:bg-muted/40",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {typeof count === "number" && (
        <Badge
          className="ml-1 rounded-full"
          variant={active ? "default" : "secondary"}
        >
          {count}
        </Badge>
      )}
    </button>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-6">
        <Button
          className="rounded-xl border-border/70 shadow-none hover:shadow-sm"
          variant="outline"
          onClick={() => location.reload()}
        >
          Actualiser
        </Button>
      </div>
    </Card>
  );
}

// --- Wrapper -------------------------------------------------------------

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ReservationsContent />
    </Suspense>
  );
}

function PageSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 h-8 w-48 rounded-lg bg-muted/40" />
      <div className="mb-4 h-12 w-full rounded-2xl border border-border/60 bg-card/60" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-48 rounded-2xl border border-border/60 bg-card/60" />
        <div className="h-48 rounded-2xl border border-border/60 bg-card/60" />
      </div>
    </div>
  );
}
