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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signUp, googleSignIn } from "@/lib/actions/auth"; // ⬅️ à implémenter côté serveur

function mapSignUpError(code?: string | null) {
  switch (code) {
    case "EmailAlreadyExists":
      return "Un compte existe déjà avec cet email.";
    case "InvalidEmail":
      return "Email invalide.";
    case "WeakPassword":
      return "Mot de passe trop faible (8+ caractères recommandés).";
    case "OAuthAccountNotLinked":
      return "Un compte existe déjà avec cet email. Connecte-toi avec la méthode initiale.";
    case "AccessDenied":
      return "Accès refusé.";
    case "Configuration":
      return "Erreur de configuration de l’authentification.";
    default:
      return code ? "Une erreur est survenue. Réessaie." : null;
  }
}

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const errorMsg = mapSignUpError(searchParams.get("error"));

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Renseigne tes informations pour commencer
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorMsg && (
            <Alert aria-live="polite" className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Échec de l’inscription</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <form action={signUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  required
                  autoComplete="name"
                  id="name"
                  name="name"
                  placeholder="Ada Lovelace"
                  type="text"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  autoComplete="email"
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  required
                  autoComplete="new-password"
                  id="password"
                  minLength={8}
                  name="password"
                  type="password"
                />
                <p className="text-xs text-muted-foreground">
                  8+ caractères, idéalement une phrase secrète.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  required
                  autoComplete="new-password"
                  id="confirmPassword"
                  minLength={8}
                  name="confirmPassword"
                  type="password"
                />
              </div>

              <div className="flex items-start gap-3 text-sm">
                <input
                  required
                  className="mt-1 h-4 w-4 rounded border-muted-foreground/40"
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
                <Label className="leading-none" htmlFor="terms">
                  J’accepte les CGU et la politique de confidentialité
                </Label>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full" type="submit">
                  Créer mon compte
                </Button>
                <Button
                  formNoValidate
                  className="w-full"
                  formAction={googleSignIn}
                  type="submit"
                  variant="outline"
                >
                  Continuer avec Google
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Déjà un compte ?{" "}
              <Link className="underline underline-offset-4" href="/sign-in">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
