import { Suspense } from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ReservationList } from "./_components/reservation-list";
import FiltersClient from "./_components/filters-client";
import { coerceRole, coerceScope, defaults } from "./utils";

import { getBookings } from "@/lib/repositories/booking";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Réservations",
  description: "Gérez vos réservations en un seul endroit.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; scope?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const sp = await searchParams;

  const role = coerceRole(sp.role ?? defaults.role);
  const scope = coerceScope(sp.scope ?? defaults.scope);

  const activeList = await getBookings(role, "active");
  const pastList = await getBookings(role, "past");

  const activeCount = activeList.length;
  const pastCount = pastList.length;

  const list = scope === "active" ? activeList : pastList;

  return (
    <div className="container mx-auto max-w-6xl px-4 pb-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Réservations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Côté voyageur et côté hôte, en un seul endroit.
          </p>
        </div>
      </div>

      <FiltersClient
        activeCount={activeCount}
        pastCount={pastCount}
        role={role}
        scope={scope}
      />

      <div className="mt-6">
        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-48 rounded-2xl border bg-card/60" />
              <div className="h-48 rounded-2xl border bg-card/60" />
            </div>
          }
        >
          <ReservationList list={list} role={role} scope={scope} />
        </Suspense>
      </div>
    </div>
  );
}
