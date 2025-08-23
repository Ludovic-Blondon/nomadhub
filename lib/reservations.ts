import type { Booking } from "@/types";

type Role = "guest" | "host";
type Scope = "active" | "past";

import { guestBookings, hostBookings } from "@/lib/seed";

export const defaults = { role: "guest" as Role, scope: "active" as Scope };

export function coerceRole(v?: string): Role {
  return v === "host" ? "host" : "guest";
}
export function coerceScope(v?: string): Scope {
  return v === "past" ? "past" : "active";
}

export async function getGuestBookings(): Promise<Booking[]> {
  return guestBookings;
}
export async function getHostBookings(): Promise<Booking[]> {
  return hostBookings;
}

export function filterActive(all: Booking[]) {
  return all.filter((b) => b.status === "pending" || b.status === "confirmed");
}
export function filterPast(all: Booking[]) {
  return all.filter((b) =>
    ["cancelled", "completed", "rejected"].includes(b.status),
  );
}
