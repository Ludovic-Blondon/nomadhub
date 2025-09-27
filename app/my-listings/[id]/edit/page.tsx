import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { EditRoomForm } from "../../_components/edit-room-form";
import { getRoomByIdAndAuthor } from "../../_repository/room.repository";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Modifier l'annonce",
  description: "Modifiez votre annonce de chambre",
};

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const room = await getRoomByIdAndAuthor(id, session.user.id);

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <EditRoomForm room={room} />
      </div>
    </div>
  );
}
