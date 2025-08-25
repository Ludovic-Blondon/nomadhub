import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { poppins } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Comment ça marche ?",
  description:
    "Comment ça marche ? NomadHub connecte voyageurs et hôtes pour des séjours authentiques.",
};

export default function HowItWorks() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="container max-w-3xl px-4 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Comment ça marche&nbsp;?
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
            connecte voyageurs et hôtes pour des séjours authentiques. L&apos;
            accueil est gratuit, le don de remerciement est 100% optionnel. Vous
            fixez vos disponibilités et vos règles.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            En bref&nbsp;: créez votre profil, échangez via la messagerie,
            confirmez le séjour. Simple, flexible, sécurisé.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/">Voir les annonces</Link>
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
        </div>
      </div>
    </section>
  );
}
