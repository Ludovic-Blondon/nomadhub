import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/validations/auth";

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

export async function handleSignUpSubmit(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const rawData = {
    firstname: String(formData.get("firstname") ?? "").trim(),
    lastname: String(formData.get("lastname") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    terms: !!formData.get("terms"),
  };

  // Validation avec Zod
  const result = signUpSchema.safeParse(rawData);

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
      values: {
        firstname: rawData.firstname,
        lastname: rawData.lastname,
        email: rawData.email,
        terms: rawData.terms,
      },
    };
  }

  const { firstname, lastname, email, password } = result.data;
  const values = { firstname, lastname, email, terms: true };

  try {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: `${firstname} ${lastname}`,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstname}+${lastname}`,
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
  } catch {
    return {
      ok: false,
      message: "Erreur lors de la création du compte",
      fieldErrors: { general: "Erreur lors de la création du compte" },
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
        values: { firstname: "", lastname: "", email: "", terms: false },
      };
    }

    return {
      ok: true,
      message: "Connexion avec Google réussie",
      fieldErrors: {},
      values: {
        firstname:
          "user" in data && data.user?.name
            ? (data.user.name.split(" ")[0] ?? "")
            : "",
        lastname:
          "user" in data && data.user?.name
            ? (data.user.name.split(" ")[1] ?? "")
            : "",
        email: "user" in data && data.user ? (data.user.email ?? "") : "",
        terms: true,
      },
    };
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Erreur OAuth Google inattendue:", error);

    return {
      ok: false,
      message: "Erreur inattendue lors de la connexion avec Google",
      fieldErrors: { general: "Erreur inattendue" },
      values: { firstname: "", lastname: "", email: "", terms: false },
    };
  }
}
