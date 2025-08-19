import type { Booking } from "@/types";

import React from "react";
import { Calendar, Clock } from "lucide-react";

import { ActiveBookingCard } from "./_components/active-booking-card";
import { PastBookingCard } from "./_components/past-booking-card";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Mock data — replace with server data as needed
 */
const bookings: Booking[] = [
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
      author: {
        name: "John Doe",
        avatarUrl: "https://github.com/shadcn.png",
      },
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
];

export default function Booking() {
  const activeBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed",
  );

  const pastBookings = bookings.filter(
    (b) => b.status === "cancelled" || b.status === "completed",
  );

  const defaultTab: "active" | "past" =
    activeBookings.length > 0 ? "active" : "past";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mes réservations
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez et suivez vos réservations en cours
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs className="space-y-6" defaultValue={defaultTab}>
        <TabsList className="grid w-full grid-cols-2 lg:w-[420px]">
          <TabsTrigger className="flex items-center gap-2" value="active">
            <Clock className="w-4 h-4" />
            Réservations actives ({activeBookings.length})
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="past">
            <Calendar className="w-4 h-4" />
            Historique ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="active">
          {activeBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Aucune réservation active
              </h3>
              <p className="text-muted-foreground">
                Vos réservations en cours apparaîtront ici.
              </p>
            </Card>
          ) : (
            activeBookings.map((booking) => (
              <ActiveBookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        <TabsContent className="space-y-4" value="past">
          {pastBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
              <p className="text-muted-foreground">
                Vos réservations passées apparaîtront ici.
              </p>
            </Card>
          ) : (
            pastBookings.map((booking) => (
              <PastBookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
