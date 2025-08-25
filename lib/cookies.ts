"use server";

import { cookies } from "next/headers";

import { coerceRole, coerceScope } from "./reservations";

import { UserFull } from "@/types";

export async function getPreference() {
  const raw = (await cookies()).get("reservations:pref")?.value;

  if (!raw) return {};
  try {
    const p = JSON.parse(raw);

    return {
      role: p.role ? coerceRole(p.role) : undefined,
      scope: p.scope ? coerceScope(p.scope) : undefined,
    };
  } catch {
    return {};
  }
}

export async function setUser(user: UserFull) {
  const cookieStore = await cookies();

  cookieStore.set("user", JSON.stringify(user));
}

export async function getUser() {
  const cookieStore = await cookies();

  const user = cookieStore.get("user")?.value;

  if (!user) return null;

  return JSON.parse(user);
}

export async function removeUser() {
  const cookieStore = await cookies();

  cookieStore.delete("user");
}
