import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validations/auth";

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

export async function handleSignInSubmit(
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const rawData = {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };

  // Validation avec Zod
  const result = signInSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;

      fieldErrors[field] = issue.message;
    });

    return {
      ok: false,
      message: "Données invalides",
      fieldErrors,
      values: { email: rawData.email },
    };
  }

  const { email, password } = result.data;
  const values = { email };

  try {
    const { error } = await authClient.signIn.email({
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
  } catch {
    return {
      ok: false,
      message: "Erreur lors de la connexion du compte",
      fieldErrors: { general: "Erreur lors de la connexion du compte" },
      values,
    };
  }
}

export async function googleSignIn() {
  try {
    const { error, data } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Erreur OAuth Google:", error);

      return {
        ok: false,
        message: error.message ?? "Erreur lors de la connexion avec Google",
        fieldErrors: { general: error.message ?? "Erreur OAuth" },
        values: { email: "" },
      };
    }

    return {
      ok: true,
      message: "Connexion avec Google réussie",
      fieldErrors: {},
      values: {
        email: "user" in data && data.user ? (data.user.email ?? "") : "",
      },
    };
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Erreur OAuth Google inattendue:", error);

    return {
      ok: false,
      message: "Erreur inattendue lors de la connexion avec Google",
      fieldErrors: { general: "Erreur inattendue" },
      values: { email: "" },
    };
  }
}
