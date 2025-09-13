import "server-only";

import { Room, RoomWithRelations } from "@/types";
import { rooms } from "@/mock/rooms";
import { db } from "@/db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getRoomById(id: number): Promise<Room> {
  await sleep(300);

  const room = rooms.find((room) => room.id === id);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
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
