import "server-only";

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { RoomWithRelations } from "@/types";
import { db } from "@/db";
import { room } from "@/db/schemas";

export async function getRoomById(id: string) {
  const result = await db.query.room.findFirst({
    where: eq(room.id, id),
    with: {
      author: true,
      medias: true,
      reviews: {
        with: {
          author: true,
        },
      },
    },
  });

  if (!result) {
    return notFound();
  }

  return result!;
}

export async function getRooms(): Promise<RoomWithRelations[]> {
  const rooms = await db.query.room.findMany({
    with: {
      author: true,
      reviews: true,
      medias: true,
    },
  });

  return rooms;
}
