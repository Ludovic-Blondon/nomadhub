// lib/actions/auth.ts
"use server";

import { redirect } from "next/navigation";

export async function googleSignIn() {
  // OAuth Google: aucun formData nécessaire
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");
}
