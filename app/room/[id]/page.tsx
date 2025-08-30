import { MapPin } from "lucide-react";
import { Metadata } from "next";

import { Caroussel } from "@/app/room/[id]/_components/caroussel";
import OwnerPreview from "@/app/room/[id]/_components/owner-preview";
import ReviewsList from "@/app/room/[id]/_components/reviews/reviews-list";
import { BookingDialog } from "@/app/room/[id]/_components/booking-dialog";
import { getRoomById } from "@/lib/repositories/room";

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
  const room = await getRoomById(Number(id));

  return (
    <div className="flex flex-col gap-4 space-y-4">
      <div className="space-y-4">
        <div className="justify-center flex items-center">
          <Caroussel room={room} />
        </div>

        <div className="justify-center flex items-center max-w-2xl mx-auto">
          <div className="flex flex-col gap-4 space-y-4">
            <div className="text-2xl font-bold">{room.title}</div>

            <OwnerPreview room={room} />

            <div className="text-md text-gray-500">
              <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-row gap-2">
                  <MapPin className="w-4 h-4" />
                  <div className="text-md text-gray-500">
                    {room.city} - {room.neighborhood}
                  </div>
                </div>

                <div className="text-md text-gray-500">
                  {room.price} € / nuit
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{room.description}</div>
            <div className="text-sm text-gray-500">
              <BookingDialog room={room} />
            </div>
          </div>
        </div>

        {room.reviews && (
          <div className="justify-center max-w-2xl mx-auto mt-10">
            <div className="flex flex-col gap-4 space-y-4">
              <div className="text-2xl font-bold">
                Commentaire{room.reviews.length > 1 ? "s" : ""} (
                {room.reviews.length} avis)
              </div>
              <ReviewsList reviews={room.reviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
