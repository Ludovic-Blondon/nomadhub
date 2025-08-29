import "server-only";
import { Room, RoomLight } from "@/types";
import { room, rooms } from "@/mock/rooms";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getRoomById(id: number): Promise<Room> {
  await sleep(300);

  return { id, ...room };
}

export async function getRooms(): Promise<RoomLight[]> {
  await sleep(300);

  return rooms;
}
