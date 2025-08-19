import {
  MapPin,
  Calendar,
  Star,
  User,
  Clock,
  Euro,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Booking() {
  const bookings = [
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
      },
    },
    {
      id: 4,
      status: "completed",
      startDate: "2024-12-01",
      endDate: "2024-12-02",
      bargain: {
        id: 3,
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
      },
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "En attente de confirmation par l'hôte",
        variant: "secondary" as const,
        className:
          "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      },
      confirmed: {
        label: "Confirmée",
        variant: "default" as const,
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      },
      cancelled: {
        label: "Annulée",
        variant: "destructive" as const,
        className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
      },
      completed: {
        label: "Terminée",
        variant: "default" as const,
        className:
          "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Badge className={config.className} variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "confirmed":
        return (
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        );
      case "cancelled":
        return <div className="w-4 h-4 text-red-500">✕</div>;
      case "completed":
        return <div className="w-4 h-4 text-green-500">✓</div>;
      default:
        return null;
    }
  };

  const calculateNights = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();

    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const actives = ["pending", "confirmed"];
  const past = ["cancelled", "completed"];
  const activeBookings = bookings.filter((b) => actives.includes(b.status));
  const pastBookings = bookings.filter((b) => past.includes(b.status));

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
      <Tabs className="space-y-6" defaultValue="active">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
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
              <Card
                key={booking.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-sm hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative w-full lg:w-80 h-48 lg:h-auto flex-shrink-0">
                      <Image
                        fill
                        alt={booking.bargain.title}
                        className="object-cover w-full h-full"
                        src={booking.bargain.images[0]}
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {booking.bargain.title}
                          </CardTitle>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {booking.bargain.city},{" "}
                                {booking.bargain.neighborhood}
                              </span>
                            </div>
                            {booking.bargain.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                  {booking.bargain.rating}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
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
                          {getStatusIcon(booking.status)}
                        </div>
                      </div>

                      <Separator className="mb-4" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">
                              Dates de séjour
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(booking.startDate)} -{" "}
                              {formatDate(booking.endDate)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {calculateNights(
                                booking.startDate,
                                booking.endDate
                              )}{" "}
                              nuit
                              {calculateNights(
                                booking.startDate,
                                booking.endDate
                              ) > 1
                                ? "s"
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Euro className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Prix total</p>
                            <p className="text-lg font-bold">
                              {booking.bargain.price *
                                calculateNights(
                                  booking.startDate,
                                  booking.endDate
                                )}{" "}
                              €
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.bargain.price} € / nuit
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          className="flex-1"
                          href={`/bargain/${booking.bargain.id}`}
                        >
                          <Button className="w-full group" variant="outline">
                            Voir les détails
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        {booking.status === "pending" && (
                          <Button className="flex-1" variant="default">
                            Gérer la réservation
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <Card
                key={booking.id}
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        fill
                        alt={booking.bargain.title}
                        className="object-cover rounded-lg"
                        src={booking.bargain.images[0]}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">
                        {booking.bargain.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(booking.startDate)} -{" "}
                        {formatDate(booking.endDate)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
