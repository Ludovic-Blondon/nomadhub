// lib/actions/auth.ts
"use server";

import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = (formData.get("email") || "").toString();
  const password = (formData.get("password") || "").toString();

  // Basic guard (optionnel)
  if (!email || !password) {
    // Tu peux retourner une valeur pour useFormState si tu veux afficher l'erreur.
    // Ici on redirige simplement:
    redirect("/sign-in?error=missing-fields");
  }

  // Déclenche l’auth Credentials (gérée par NextAuth v5)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");

  // Note: signIn déclenche déjà une redirection côté serveur.
  // Si tu veux forcer une route après coup, tu peux encore utiliser redirect(...)
}

export async function googleSignIn() {
  // OAuth Google: aucun formData nécessaire
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");
}

export async function signUp(formData: FormData) {
  const name = (formData.get("name") || "").toString();
  const email = (formData.get("email") || "").toString();
  const password = (formData.get("password") || "").toString();
  const confirmPassword = (formData.get("confirmPassword") || "").toString();

  if (!name || !email || !password || !confirmPassword) {
    redirect("/sign-up?error=missing-fields");
  }

  if (password !== confirmPassword) {
    redirect("/sign-up?error=password-mismatch");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");
}
