// lib/actions/auth.ts
"use server";

import { redirect } from "next/navigation";

export type LoginState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password", string | string[]>>;
  values?: Partial<Record<"email", string>>;
};

export async function signIn(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") || "").toString();
  const password = (formData.get("password") || "").toString();

  // Basic guard (optionnel)
  if (!email) {
    // Tu peux retourner une valeur pour useFormState si tu veux afficher l'erreur.
    // Ici on redirige simplement:
    return {
      ok: false,
      message: "Email is required",
      fieldErrors: {
        email: "Email is required",
      },
      values: {
        email: email,
      },
    };
  }
  if (!password) {
    return {
      ok: false,
      message: "Password is required",
      fieldErrors: {
        password: "Password is required",
      },
      values: {},
    };
  }

  // Déclenche l’auth Credentials (gérée par NextAuth v5)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");
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
