"use server";

import { cookies } from "next/headers";

import { UserFull } from "@/types";

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
