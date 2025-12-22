import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validations/auth";
import { googleSignIn as googleOAuth } from "@/lib/auth-utils";

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
  await googleOAuth();
}
