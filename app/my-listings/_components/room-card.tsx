"use client";

import { useState } from "react";
import { Edit, Trash2, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { DeleteConfirmModal } from "./delete-confirm-modal";

import { RoomWithRelations } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
  room: RoomWithRelations;
}

export function RoomCard({ room }: RoomCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mainImage = room.medias?.[0];
  const reviewsCount = room.reviews?.length || 0;
  const averageRating = room.rating || 0;

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-[4/3]">
          {mainImage ? (
            <Image
              fill
              alt={room.title}
              className="object-cover"
              src={mainImage.path}
            />
          ) : (
            <div className="w-full h-full bg-default-100 flex items-center justify-center">
              <span className="text-default-400">Aucune image</span>
            </div>
          )}
          <Badge className="absolute top-3 right-3" variant="secondary">
            {room.price}€ / nuit
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{room.title}</h3>

            <div className="flex items-center text-sm text-default-500">
              <MapPin className="w-4 h-4 mr-1" />
              {room.city}, {room.neighborhood}
            </div>

            {reviewsCount > 0 && (
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-default-500 ml-1">
                  ({reviewsCount} avis)
                </span>
              </div>
            )}

            <p className="text-sm text-default-600 line-clamp-2">
              {room.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2">
          <Button asChild className="flex-1" size="sm" variant="outline">
            <Link href={`/my-listings/${room.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Link>
          </Button>

          <Button
            className="text-destructive hover:text-destructive"
            size="sm"
            variant="outline"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        room={room}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}
