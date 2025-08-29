import type { Booking } from "@/types";
import type { Role, Scope } from "@/app/booking/type";

import { guestBookings, hostBookings } from "@/mock/reservations";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getGuestBookings(): Promise<Booking[]> {
  return guestBookings;
}
export async function getHostBookings(): Promise<Booking[]> {
  return hostBookings;
}

export async function getBookings(role: Role, scope: Scope) {
  await sleep(100);

  const all = role === "host" ? hostBookings : guestBookings;

  if (scope === "active") {
    return filterActive(all);
  }

  return filterPast(all);
}

export function filterActive(all: Booking[]) {
  return all.filter((b) => b.status === "pending" || b.status === "confirmed");
}
export function filterPast(all: Booking[]) {
  return all.filter((b) =>
    ["cancelled", "completed", "rejected"].includes(b.status),
  );
}
