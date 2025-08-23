"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function refreshReservations() {
  revalidatePath("/reservation");
}

export async function savePreference(partial: {
  role?: string;
  scope?: string;
}) {
  const jar = await cookies();
  const current = JSON.parse(jar.get("reservations:pref")?.value ?? "{}");

  jar.set("reservations:pref", JSON.stringify({ ...current, ...partial }), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
