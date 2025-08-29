"use client";
import { Card, CardBody, CardFooter, Image, Link } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";

import { RoomLight } from "@/types";

export default function HomeCard({ item }: { item: RoomLight }) {
  return (
    <Card
      key={item.id}
      isPressable
      as={Link}
      className="group"
      href={`/room/${item.id}`}
      shadow="sm"
    >
      <CardBody className="p-0">
        <div className="relative">
          <Image
            alt={item.city}
            className="w-full object-cover h-[140px]"
            radius="lg"
            shadow="sm"
            src={item.img}
            width="100%"
          />
          <span
            className="
                  absolute right-2 top-2 z-10
                  rounded-full border border-default-200
                  bg-background/80 px-2 py-1 text-xs font-medium text-foreground
                  shadow-sm backdrop-blur
                  transform scale-95 opacity-90
                  transition-all duration-300 ease-out
                  group-hover:scale-100 group-hover:opacity-100
                "
          >
            {item.price}
          </span>
        </div>
      </CardBody>

      <CardFooter className="text-small justify-between items-center">
        <p>
          <b>{item.city}</b>
          <i className="text-default-500"> {item.neighborhood}</i>
        </p>
        <ArrowUpRight
          className="
                w-4 h-4 text-default-500
                transform translate-x-0 opacity-70
                transition-all duration-300 ease-out
                group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-foreground
              "
        />
      </CardFooter>
    </Card>
  );
}
