import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Booking() {
  const bookings = [
    {
      id: 1,
      status: "pending",
      startDate: "2025-01-01",
      endDate: "2025-01-02",
      bargain: {
        id: 1,
        title: "Magnifique canapé lit chez William - Salon",
        city: "Paris",
        neighborhood: "1er arrondissement",
        rating: 4.5,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim. Sed euismod, enim eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
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
      dates: [
        {
          start: "2025-01-01",
          end: "2025-01-02",
        },
      ],
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
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800",
      },
      confirmed: {
        label: "Confirmée",
        className: "bg-green-100 text-green-800",
      },
      cancelled: {
        label: "Annulée",
        className: "bg-red-100 text-red-800",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Mes réservations</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Réservations en cours</h2>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link key={booking.id} href={`/bargain/${booking.bargain.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-48 h-32 flex-shrink-0">
                        <Image
                          alt={booking.bargain.title}
                          className="object-cover rounded-l-xl"
                          fill
                          src={booking.bargain.images[0]}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 py-4 pr-4">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg line-clamp-1">
                            {booking.bargain.title}
                          </CardTitle>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {booking.bargain.city} -{" "}
                              {booking.bargain.neighborhood}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(booking.startDate)} -{" "}
                              {formatDate(booking.endDate)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {booking.bargain.price} € / nuit
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
