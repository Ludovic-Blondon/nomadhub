import { authClient } from "@/lib/auth-client";

export async function googleSignIn() {
  try {
    const { error, data } = await authClient.signIn.social({
      provider: "google",
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Erreur OAuth Google:", error);

      return {
        ok: false,
        message: error.message ?? "Erreur lors de la connexion avec Google",
        fieldErrors: { general: error.message ?? "Erreur OAuth" },
      };
    }

    return {
      ok: true,
      message: "Connexion avec Google réussie",
      fieldErrors: {},
      data,
    };
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Erreur OAuth Google inattendue:", error);

    return {
      ok: false,
      message: "Erreur inattendue lors de la connexion avec Google",
      fieldErrors: { general: "Erreur inattendue" },
    };
  }
}
