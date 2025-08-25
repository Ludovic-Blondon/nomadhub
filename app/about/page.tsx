import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { poppins } from "@/app/fonts";

export const metadata: Metadata = {
  title: "À propos",
  description: "À propos de NomadHub, son histoire et son fonctionnement.",
};

export default function AboutPage() {
  return (
    <section className="w-full">
      <div className="container max-w-3xl px-4 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            À propos de{" "}
            <span className={`${poppins.className} font-bold`}>NomadHub</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Notre mission : rendre l’hospitalité accessible, simple et humaine.{" "}
            <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
            connecte voyageurs et hôtes pour des séjours authentiques —
            gratuits, basés sur la confiance et le respect.{" "}
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Nos valeurs : simplicité, gratuité, authenticité, entraide. Nous
            croyons qu’un séjour réussit quand il crée un lien, pas une
            transaction.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            D’où on vient : l’envie de voyager autrement et d’accueillir sans
            contraintes.{" "}
            <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
            est né d’une communauté qui préfère la rencontre aux frais cachés,
            l’échange à la surenchère.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Où on va : bâtir un réseau mondial d’hospitalité bienveillante, où
            chacun peut offrir un canapé ou une chambre selon ses
            disponibilités, en toute sécurité.
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
              <Link href="/sign-up">Rejoindre la communauté</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Transparent, sécurisé et ouvert à tous.
          </p>
        </div>
      </div>
    </section>
  );
}
