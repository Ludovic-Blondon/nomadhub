"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, googleSignIn } from "@/lib/actions/auth"; // ⬅️
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function mapNextAuthError(code?: string | null) {
  switch (code) {
    case "CredentialsSignin":
      return "Identifiants incorrects. Réessaie.";
    case "OAuthAccountNotLinked":
      return "Un compte existe déjà avec cet email. Connecte-toi avec la méthode initiale.";
    case "AccessDenied":
      return "Accès refusé.";
    case "Verification":
      return "La vérification a échoué. Réessaie.";
    case "Configuration":
      return "Erreur de configuration de l’authentification.";
    case "password-mismatch":
      return "Les mots de passe ne correspondent pas.";
    default:
      return code ? "Une erreur est survenue. Réessaie." : null;
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const nextAuthErrorMsg = mapNextAuthError(searchParams.get("error"));

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nextAuthErrorMsg && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Échec de connexion</AlertTitle>
              <AlertDescription>{nextAuthErrorMsg}</AlertDescription>
            </Alert>
          )}
          <form action={signIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoComplete="email"
                  id="email"
                  name="email" // ⬅️ important pour FormData
                  placeholder="m@example.com"
                  type="email"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="/forgot-password"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  autoComplete="current-password"
                  id="password"
                  name="password" // ⬅️ important pour FormData
                  type="password"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full" type="submit">
                  Login
                </Button>

                {/* Ce bouton déclenche l’action OAuth Google */}
                <Button
                  formNoValidate
                  className="w-full"
                  formAction={googleSignIn}
                  type="submit"
                  variant="outline"
                >
                  Se connecter avec Google
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Pas de compte ?{" "}
              <Link className="underline underline-offset-4" href="/sign-up">
                Créer un compte
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
