import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { RoomsList } from "./_components/rooms-list";
import { getRoomsByAuthor } from "./_repository/room.repository";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Mes annonces",
  description: "Gérez vos annonces de chambres",
};

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const rooms = await getRoomsByAuthor(session.user.id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes annonces</h1>
          <p className="text-default-500 mt-2">
            Gérez vos annonces de chambres
          </p>
        </div>
      </div>

      <RoomsList rooms={rooms} />
    </div>
  );
}
