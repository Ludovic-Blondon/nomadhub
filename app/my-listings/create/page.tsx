import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { RoomForm } from "../_components/room-form";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Ajouter une chambre",
  description: "Créez une nouvelle annonce de chambre sur NomadHub",
};

export default async function AddRoomPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <RoomForm />
      </div>
    </div>
  );
}
