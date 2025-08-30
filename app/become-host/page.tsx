import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Devenir hôte",
  description:
    "Accueillez des voyageurs quand vous le souhaitez avec un système de dons volontaires.",
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
            règles, les disponibilités et pouvez suggérer un don de remerciement
            dans votre annonce. L'hébergement reste gratuit, le don volontaire.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Simple, sûr et basé sur l'entraide. Vous gardez le contrôle total
            sur vos disponibilités et vos conditions d'accueil. L'hôte peut
            mentionner un montant suggéré pour le don, mais celui-ci reste
            entièrement à la discrétion de l'invité.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/sign-up">Créer une annonce</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <Link href="/sign-in">Se connecter</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Pas de frais. Don de remerciement optionnel et volontaire.
          </p>
        </div>
      </div>
    </section>
  );
}
