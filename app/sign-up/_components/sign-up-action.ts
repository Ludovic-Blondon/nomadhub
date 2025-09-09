import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/validations/auth";
import { googleSignIn as googleOAuth } from "@/lib/auth-utils";

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
  const result = await googleOAuth();

  return {
    ...result,
    values: {
      firstname:
        result.ok &&
        result.data &&
        "user" in result.data &&
        result.data.user?.name
          ? (result.data.user.name.split(" ")[0] ?? "")
          : "",
      lastname:
        result.ok &&
        result.data &&
        "user" in result.data &&
        result.data.user?.name
          ? (result.data.user.name.split(" ")[1] ?? "")
          : "",
      email:
        result.ok && result.data && "user" in result.data && result.data.user
          ? (result.data.user.email ?? "")
          : "",
      terms: result.ok,
    },
  };
}
