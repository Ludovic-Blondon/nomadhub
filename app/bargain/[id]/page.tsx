import { MapPin } from "lucide-react";
import { Metadata } from "next";

import { Caroussel } from "@/app/bargain/[id]/_components/caroussel";
import OwnerPreview from "@/app/bargain/[id]/_components/owner-preview";
import ReviewsList from "@/app/bargain/[id]/_components/reviews/reviews-list";
import { BookingDialog } from "@/app/bargain/[id]/_components/booking-dialog";

export const metadata: Metadata = {
  title: "Annonce",
  description: "Découvrez l'annonce de votre réservation.",
};

export default async function Bargain({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bargain = {
    id: parseInt(id),
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
  };

  return (
    <div className="flex flex-col gap-4 space-y-4">
      <div className="space-y-4">
        <div className="justify-center flex items-center">
          <Caroussel bargain={bargain} />
        </div>

        <div className="justify-center flex items-center max-w-2xl mx-auto">
          <div className="flex flex-col gap-4 space-y-4">
            <div className="text-2xl font-bold">{bargain.title}</div>

            <OwnerPreview bargain={bargain} />

            <div className="text-md text-gray-500">
              <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-row gap-2">
                  <MapPin className="w-4 h-4" />
                  <div className="text-md text-gray-500">
                    {bargain.city} - {bargain.neighborhood}
                  </div>
                </div>

                <div className="text-md text-gray-500">
                  {bargain.price} € / nuit
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{bargain.description}</div>
            <div className="text-sm text-gray-500">
              <BookingDialog bargain={bargain} />
            </div>
          </div>
        </div>

        <div className="justify-center max-w-2xl mx-auto mt-10">
          <div className="flex flex-col gap-4 space-y-4">
            <div className="text-2xl font-bold">
              Commentaire{bargain.reviews.length > 1 ? "s" : ""} (
              {bargain.reviews.length} avis)
            </div>
            <ReviewsList reviews={bargain.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
