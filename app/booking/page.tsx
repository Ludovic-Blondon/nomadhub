"use client";

import type { Booking } from "@/types";

import React, { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Clock, Home, User } from "lucide-react";

import { ActiveBookingCard } from "./_components/active-booking-card";
import { PastBookingCard } from "./_components/past-booking-card";
import { HostActiveBookingCard } from "./_components/host-active-booking-card";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

/**
 * Page Réservations — classe & minimal (Next.js + shadcn)
 * - URL source of truth pour le rôle (?role=guest|host)
 * - Mémoire d'onglet par rôle (localStorage)
 * - Composants cartes minimalistes réutilisés
 * - UI cohérente clair/sombre via tokens shadcn
 */

// --- Mock data (à remplacer par vos données serveur) ----------------------
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

// --- Helpers --------------------------------------------------------------

type Role = "guest" | "host";

function useUrlRole(): [Role, (r: Role) => void] {
  const router = useRouter();
  const params = useSearchParams();
  const roleParam = (params.get("role") as Role) || undefined;

  // Fallback: localStorage → guest
  const role = (roleParam ||
    (typeof window !== "undefined" &&
      (localStorage.getItem("reservations:lastRole") as Role)) ||
    "guest") as Role;

  const setRole = (r: Role) => {
    if (typeof window !== "undefined")
      localStorage.setItem("reservations:lastRole", r);
    const search = new URLSearchParams(params?.toString());

    search.set("role", r);
    router.replace(`?${search.toString()}`);
  };

  // Aligne l'URL au premier rendu si manquante
  useEffect(() => {
    const current = params.get("role");

    if (!current) setRole(role);
  }, []);

  return [role, setRole];
}

function useRoleTabMemory(
  role: Role,
): ["active" | "past", (v: "active" | "past") => void] {
  const key = `reservations:${role}:tab`;
  const [tab, setTab] = React.useState<"active" | "past">(() => {
    if (typeof window === "undefined") return "active";

    return (localStorage.getItem(key) as "active" | "past") || "active";
  });

  const update = (v: "active" | "past") => {
    setTab(v);
    if (typeof window !== "undefined") localStorage.setItem(key, v);
  };

  return [tab, update];
}

// --- Page -----------------------------------------------------------------

export default function ReservationsPage() {
  const [role, setRole] = useUrlRole();

  // Listes mémoïsées
  const guestActive = useMemo(
    () =>
      guestBookings.filter(
        (b) => b.status === "pending" || b.status === "confirmed",
      ),
    [],
  );
  const guestPast = useMemo(
    () =>
      guestBookings.filter((b) =>
        ["cancelled", "completed", "rejected"].includes(b.status),
      ),
    [],
  );

  const hostActive = useMemo(
    () =>
      hostBookings.filter(
        (b) => b.status === "pending" || b.status === "confirmed",
      ),
    [],
  );
  const hostPast = useMemo(
    () =>
      hostBookings.filter((b) =>
        ["cancelled", "completed", "rejected"].includes(b.status),
      ),
    [],
  );

  const [guestTab, setGuestTab] = useRoleTabMemory("guest");
  const [hostTab, setHostTab] = useRoleTabMemory("host");

  const guestDefault: "active" | "past" =
    guestActive.length > 0 ? "active" : "past";
  const hostDefault: "active" | "past" =
    hostActive.length > 0 ? "active" : "past";

  useEffect(() => {
    // Choix par défaut sensé si pas de mémoire locale
    if (role === "guest" && !localStorage.getItem("reservations:guest:tab"))
      setGuestTab(guestDefault);
    if (role === "host" && !localStorage.getItem("reservations:host:tab"))
      setHostTab(hostDefault);
  }, [role]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Réservations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gérez vos réservations côté voyageur et côté hôte
          </p>
        </div>
      </div>

      {/* Tabs Rôle */}
      <Tabs
        className="space-y-8"
        value={role}
        onValueChange={(v) => setRole(v as Role)}
      >
        <TabsList className="grid w-full grid-cols-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50 lg:w-[420px]">
          <TabsTrigger className="flex items-center gap-2" value="guest">
            <User className="h-4 w-4" /> Voyageur ({guestActive.length})
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="host">
            <Home className="h-4 w-4" /> Hôte ({hostActive.length})
          </TabsTrigger>
        </TabsList>

        {/* Guest */}
        <TabsContent className="space-y-6" value="guest">
          <RoleSection
            activeCount={guestActive.length}
            activeList={guestActive}
            defaultTab={guestDefault}
            pastCount={guestPast.length}
            pastList={guestPast}
            subtitle="Gérez et suivez vos réservations en tant que client"
            tab={guestTab}
            title="Mes réservations (voyageur)"
            onTabChange={setGuestTab}
          />
        </TabsContent>

        {/* Host */}
        <TabsContent className="space-y-6" value="host">
          <RoleSection
            activeCount={hostActive.length}
            activeList={hostActive}
            defaultTab={hostDefault}
            pastCount={hostPast.length}
            pastList={hostPast}
            subtitle="Acceptez, refusez et suivez les séjours"
            tab={hostTab}
            title="Réservations de mes annonces (hôte)"
            onTabChange={setHostTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- Sous-composants ------------------------------------------------------

type RoleSectionProps = {
  title: string;
  subtitle: string;
  activeCount: number;
  pastCount: number;
  defaultTab: "active" | "past";
  tab: "active" | "past";
  onTabChange: (v: "active" | "past") => void;
  activeList: Booking[];
  pastList: Booking[];
  role?: Role;
};

function RoleSection({
  title,
  subtitle,
  activeCount,
  pastCount,
  defaultTab,
  tab,
  onTabChange,
  activeList,
  pastList,
}: RoleSectionProps) {
  const [role] = useUrlRole();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      </div>

      {/* Onglets statut */}
      <Tabs
        className="space-y-6"
        defaultValue={defaultTab}
        value={tab}
        onValueChange={(v) => onTabChange(v as "active" | "past")}
      >
        <TabsList className="grid w-full grid-cols-2 rounded-xl border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50 lg:w-[420px]">
          <TabsTrigger className="flex items-center gap-2" value="active">
            <Clock className="h-4 w-4" /> Réservations actives ({activeCount})
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="past">
            <Calendar className="h-4 w-4" /> Historique ({pastCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="active">
          {activeList.length === 0 ? (
            <EmptyState
              description={
                role === "host"
                  ? "Les demandes et séjours confirmés apparaîtront ici lorsque vous êtes hôte."
                  : "Vos réservations en cours apparaîtront ici."
              }
              icon={
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              }
              title={
                role === "host"
                  ? "Aucune réservation active côté hôte"
                  : "Aucune réservation active"
              }
            />
          ) : (
            activeList.map((booking) =>
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
              ),
            )
          )}
        </TabsContent>

        <TabsContent className="space-y-4" value="past">
          {pastList.length === 0 ? (
            <EmptyState
              description={
                role === "host"
                  ? "Vos séjours terminés ou annulés côté hôte apparaîtront ici."
                  : "Vos réservations passées apparaîtront ici."
              }
              icon={
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              }
              title={
                role === "host"
                  ? "Aucun historique côté hôte"
                  : "Aucun historique"
              }
            />
          ) : (
            pastList.map((booking) => (
              <PastBookingCard
                key={`${role}-${booking.id}`}
                booking={booking}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center backdrop-blur supports-[backdrop-filter]:bg-card/50">
      {icon}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-6">
        <Button
          className="rounded-xl border-border/70 shadow-none hover:shadow-sm"
          variant="outline"
        >
          Actualiser
        </Button>
      </div>
    </Card>
  );
}
