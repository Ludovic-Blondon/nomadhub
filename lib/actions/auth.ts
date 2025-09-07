// lib/actions/auth.ts
"use server";

import { redirect } from "next/navigation";

import { setUser } from "../cookies";
import { auth } from "../auth";

export type LoginState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password", string | string[]>>;
  values?: Partial<Record<"email", string>>; // ⚠️ pas de password ici
};

export type SignUpState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<
    Record<
      | "firstname"
      | "lastname"
      | "email"
      | "password"
      | "confirmPassword"
      | "terms",
      string | string[]
    >
  >;
  // on ne renvoie jamais les mots de passe pour des raisons de sécurité
  values?: Partial<
    Record<"firstname" | "lastname" | "email" | "terms", string | boolean>
  >;
};

export async function signIn(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  // Toujours renvoyer les valeurs non sensibles
  const values: LoginState["values"] = { email };
  const fieldErrors: LoginState["fieldErrors"] = {};

  if (!email) fieldErrors.email = "Email is required";
  if (!password) fieldErrors.password = "Password is required";

  // Erreurs de validation → pas de redirect, on renvoie l'état + values
  if (Object.keys(fieldErrors).length) {
    return {
      ok: false,
      message: "Champs manquants",
      fieldErrors,
      values,
    };
  }

  // Exemple NextAuth v5 (credentials) sans redirection auto :
  // const res = await authSignIn('credentials', { redirect: false, email, password })
  // if (res?.error) {
  //   return { ok: false, message: 'Identifiants incorrects', values }
  // }

  // Si OK → redirection explicite (seulement en succès)
  // redirect('/dashboard')
  // (placeholder de démo)
  await new Promise((resolve) => setTimeout(resolve, 400));
  await setUser({
    firstname: "John",
    lastname: "Doe",
    email,
    avatarUrl: "https://github.com/shadcn.png",
  });
  redirect("/");
}

export async function googleSignIn() {
  // OAuth Google: aucun formData nécessaire
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/");
}

export async function signUp(
  _prev: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const firstname = String(formData.get("firstname") ?? "").trim();
  const lastname = String(formData.get("lastname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const terms = !!formData.get("terms");

  const values = { firstname, lastname, email, terms };
  const fieldErrors: SignUpState["fieldErrors"] = {};

  // Vos validations...
  if (!firstname) fieldErrors.firstname = "Prénom est requis";
  if (!lastname) fieldErrors.lastname = "Nom est requis";
  if (!email) fieldErrors.email = "Email est requis";
  if (!password) fieldErrors.password = "Mot de passe est requis";
  if (!confirmPassword) fieldErrors.confirmPassword = "Mot de passe est requis";
  if (!terms)
    fieldErrors.terms = "Vous devez accepter les conditions d'utilisation";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Champs manquants", fieldErrors, values };
  }

  if (password !== confirmPassword) {
    return {
      ok: false,
      message: "Les mots de passe ne correspondent pas",
      fieldErrors: {},
      values,
    };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `${firstname} ${lastname}`,
        image: "https://github.com/shadcn.png",
      },
    });

    // ✅ Si succès, on sort du try/catch avant de redirect
    if (result) {
      // Le redirect doit être en dehors du try/catch
      redirect("/");
    }
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);

    // ✅ Vérifier si c'est une erreur de redirect
    if (error?.message === "NEXT_REDIRECT") {
      throw error; // Re-lancer l'erreur de redirect
    }

    return {
      ok: false,
      message: error.message || "Erreur lors de la création du compte",
      fieldErrors: {},
      values,
    };
  }

  // Cette ligne ne devrait jamais être atteinte
  return {
    ok: true,
    message: "Compte créé avec succès",
    fieldErrors: {},
    values,
  };
}
