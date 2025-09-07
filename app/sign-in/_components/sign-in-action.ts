// hooks/useSignUpAction.ts
import { authClient } from "@/lib/auth-client";

export type SignInState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
  values: {
    email: string;
  };
};

export const initialState: SignInState = {
  ok: false,
  message: "",
  fieldErrors: {},
  values: { email: "" },
};

// ✅ Fonction côté client (pas de "use server")
export async function handleSignInSubmit(
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const values = { email };
  const fieldErrors: Record<string, string> = {};

  // Validations
  if (!email) fieldErrors.email = "Email est requis";
  if (!password) fieldErrors.password = "Mot de passe est requis";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Champs manquants", fieldErrors, values };
  }

  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      return {
        ok: false,
        message: error.message ?? "Erreur lors de la connexion du compte",
        fieldErrors: {
          general: error.message ?? "Erreur lors de la connexion du compte",
        },
        values,
      };
    }

    return {
      ok: true,
      message: "Compte connecté avec succès",
      fieldErrors: {},
      values,
    };
  } catch (_error: any) {
    return {
      ok: false,
      message: "Erreur lors de la connexion du compte",
      fieldErrors: { general: "Erreur lors de la connexion du compte" },
      values,
    };
  }
}
