import { Suspense } from "react";

// ❌ import { headers } from "next/headers";  // à supprimer
import { ReservationList } from "./_components/reservation-list";
import FiltersClient from "./_components/filters-client";
import { refreshReservations } from "./actions";

import {
  getGuestBookings,
  getHostBookings,
  filterActive,
  filterPast,
  coerceRole,
  coerceScope,
  defaults,
} from "@/lib/reservations";
import { getPreference } from "@/lib/cookies";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; scope?: string }>;
}) {
  const sp = await searchParams;

  // Optionnel: fallback cookie si tu veux respecter la "mémoire"
  const pref = await getPreference(); // { role?, scope? } — si tu as implémenté

  const role = coerceRole(sp.role ?? pref.role ?? defaults.role);
  const scope = coerceScope(sp.scope ?? pref.scope ?? defaults.scope);

  const all =
    role === "guest" ? await getGuestBookings() : await getHostBookings();

  const activeList = filterActive(all);
  const pastList = filterPast(all);

  const activeCount = activeList.length;
  const pastCount = pastList.length;

  const list = scope === "active" ? filterActive(all) : filterPast(all);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Réservations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Côté voyageur et côté hôte, en un seul endroit.
          </p>
        </div>

        <form action={refreshReservations}>
          <button className="inline-flex rounded-md border px-3 py-1.5 text-sm">
            Actualiser
          </button>
        </form>
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
