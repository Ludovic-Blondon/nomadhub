import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Devenir hôte",
  description: "Accueillez des voyageurs quand vous le souhaitez.",
};

export default function BecomeHost() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="container max-w-3xl px-4 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Devenir hôte
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Accueillez des voyageurs quand vous le souhaitez. Vous fixez les
            règles. Gratuit, simple et sûr.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/signup">Créer une annonce</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Pas de frais. Don de remerciement optionnel.
          </p>
        </div>
      </div>
    </section>
  );
}
