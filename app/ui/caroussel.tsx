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
import { Bargain } from "@/types";

export function Caroussel({ bargain }: { bargain: Bargain }) {
  return (
    <Carousel className="w-full max-w-xl h-full">
      <CarouselContent>
        {bargain.images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  alt={`${bargain.title} - ${bargain.city} - ${bargain.neighborhood}`}
                  className="object-contain"
                  src={image}
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
