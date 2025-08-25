// lib/actions/auth.ts
"use server";

import { redirect } from "next/navigation";

import { setUser } from "../cookies";

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
  "use server";
  const firstname = String(formData.get("firstname") ?? "").trim();
  const lastname = String(formData.get("lastname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const terms = !!formData.get("terms");

  const values = { firstname, lastname, email, terms }; // ⬅️ toujours renvoyé dans les erreurs
  const fieldErrors: SignUpState["fieldErrors"] = {};

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
      values, // ⬅️ garde nom/email/terms
    };
  }

  // … création utilisateur + try/catch
  // en cas d’erreur serveur, renvoyer aussi { ok:false, message:'…', values }
  // ex:
  // try { ...; redirect('/') } catch { return { ok:false, message:'Inscription impossible', values } }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await setUser({
    firstname,
    lastname,
    email,
    avatarUrl: "https://github.com/shadcn.png",
  });
  redirect("/"); // ⬅️ seulement en succès
}
