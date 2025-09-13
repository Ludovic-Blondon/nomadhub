"use client";

import { Image } from "@heroui/react";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RoomWithRelations } from "@/types";

export function Caroussel({ room }: { room: RoomWithRelations }) {
  return (
    <Carousel className="w-full max-w-xl h-full">
      <CarouselContent>
        {room.medias.map((media, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center">
                <Image
                  alt={`${room.title} - ${room.city} - ${room.neighborhood}`}
                  className="object-contain"
                  removeWrapper={true}
                  src={media.path}
                  width={1000}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
