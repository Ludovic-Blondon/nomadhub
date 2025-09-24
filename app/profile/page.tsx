import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { ProfileContent } from "./_components/profile-content";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Mon profil",
  description:
    "Gérez vos informations personnelles et vos paramètres de compte",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <p className="text-default-500 mt-2">
          Gérez vos informations personnelles et vos paramètres de compte
        </p>
      </div>

      <ProfileContent user={session.user} />
    </div>
  );
}
