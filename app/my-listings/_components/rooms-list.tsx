"use client";

import { RoomCard } from "./room-card";
import { EmptyState } from "./empty-state";

import { RoomWithRelations } from "@/types";

interface RoomsListProps {
  rooms: RoomWithRelations[];
}

export function RoomsList({ rooms }: RoomsListProps) {
  if (rooms.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
