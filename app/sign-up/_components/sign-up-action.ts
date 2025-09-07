// hooks/useSignUpAction.ts
import { authClient } from "@/lib/auth-client";

export type SignUpState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
  values: {
    firstname: string;
    lastname: string;
    email: string;
    terms: boolean;
  };
};

export const initialState: SignUpState = {
  ok: false,
  message: "",
  fieldErrors: {},
  values: { firstname: "", lastname: "", email: "", terms: false },
};

// ✅ Fonction côté client (pas de "use server")
export async function handleSignUpSubmit(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const firstname = String(formData.get("firstname") ?? "").trim();
  const lastname = String(formData.get("lastname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const terms = !!formData.get("terms");

  const values = { firstname, lastname, email, terms };
  const fieldErrors: Record<string, string> = {};

  // Validations
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
      fieldErrors: {
        confirmPassword: "Les mots de passe ne correspondent pas",
      },
      values,
    };
  }

  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: `${firstname} ${lastname}`,
      image: "https://github.com/shadcn.png",
    });

    if (error) {
      return {
        ok: false,
        message: error.message ?? "Erreur lors de la création du compte",
        fieldErrors: {
          general: error.message ?? "Erreur lors de la création du compte",
        },
        values,
      };
    }

    return {
      ok: true,
      message: "Compte créé avec succès",
      fieldErrors: {},
      values,
    };
  } catch (_error: any) {
    return {
      ok: false,
      message: "Erreur lors de la création du compte",
      fieldErrors: { general: "Erreur lors de la création du compte" },
      values,
    };
  }
}
