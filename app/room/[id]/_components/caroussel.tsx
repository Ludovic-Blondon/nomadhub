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
import { Room } from "@/types";

export function Caroussel({ room }: { room: Room }) {
  return (
    <Carousel className="w-full max-w-xl h-full">
      <CarouselContent>
        {room.images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center">
                <Image
                  alt={`${room.title} - ${room.city} - ${room.neighborhood}`}
                  className="object-contain"
                  src={image}
                  width={1000}
                  removeWrapper={true}
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
