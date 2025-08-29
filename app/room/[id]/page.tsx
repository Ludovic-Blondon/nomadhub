import { MapPin } from "lucide-react";
import { Metadata } from "next";

import { Caroussel } from "@/app/room/[id]/_components/caroussel";
import OwnerPreview from "@/app/room/[id]/_components/owner-preview";
import ReviewsList from "@/app/room/[id]/_components/reviews/reviews-list";
import { BookingDialog } from "@/app/room/[id]/_components/booking-dialog";
import { getBargainById } from "@/lib/repositories/bargains";

export const metadata: Metadata = {
  title: "Annonce",
  description: "Découvrez l'annonce de votre réservation.",
};

export default async function Room({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bargain = await getBargainById(Number(id));

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

        {bargain.reviews && (
          <div className="justify-center max-w-2xl mx-auto mt-10">
            <div className="flex flex-col gap-4 space-y-4">
              <div className="text-2xl font-bold">
                Commentaire{bargain.reviews.length > 1 ? "s" : ""} (
                {bargain.reviews.length} avis)
              </div>
              <ReviewsList reviews={bargain.reviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
