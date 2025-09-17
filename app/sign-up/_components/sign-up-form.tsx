"use client";

import { AlertCircle } from "lucide-react";
import { useActionState } from "react";

import {
  handleSignUpSubmit,
  initialState,
  googleSignIn,
} from "./sign-up-action";

import { cn } from "@/lib/utils";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { AuthLink } from "@/components/auth-link";
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

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(
    handleSignUpSubmit,
    initialState,
  );

  useAuthRedirect(state.ok);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Renseignez vos informations pour commencer
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!state.ok && state?.message && (
            <Alert aria-live="polite" className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{state.message}</AlertTitle>
              <AlertDescription>
                {Object.entries(state.fieldErrors ?? {})
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <p key={key}>{value}</p>
                  ))}
              </AlertDescription>
            </Alert>
          )}

          <form noValidate action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="firstname">Prénom</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.firstname}
                  autoComplete="name"
                  defaultValue={(state.values?.firstname as string) ?? ""}
                  id="firstname"
                  name="firstname"
                  placeholder="John"
                  type="text"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="lastname">Nom</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.lastname}
                  autoComplete="name"
                  defaultValue={(state.values?.lastname as string) ?? ""}
                  id="lastname"
                  name="lastname"
                  placeholder="Dupont"
                  type="text"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.email}
                  autoComplete="email"
                  defaultValue={(state.values?.email as string) ?? ""}
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
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
                  autoComplete="new-password"
                  id="confirmPassword"
                  minLength={8}
                  name="confirmPassword"
                  type="password"
                />
              </div>

              <div className="flex items-start gap-3 text-sm">
                <input
                  aria-invalid={!!state?.fieldErrors?.terms}
                  className="mt-1 h-4 w-4 rounded border-muted-foreground/40"
                  defaultChecked={Boolean(state.values?.terms)}
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
                <Label className="leading-none" htmlFor="terms">
                  J’accepte les CGU et la politique de confidentialité
                </Label>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full" disabled={pending} type="submit">
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
              <AuthLink
                className="underline underline-offset-4"
                href="/sign-in"
              >
                Se connecter
              </AuthLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
