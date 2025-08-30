import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { poppins } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Informations",
  description: "Tout savoir sur NomadHub : comment ça marche et notre mission.",
};

export default function InfoPage() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="container max-w-4xl px-4 py-24">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Tout savoir sur{" "}
            <span className={`${poppins.className} font-bold`}>NomadHub</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Découvrez comment fonctionne notre plateforme d'hospitalité basée
            sur l'entraide et les dons volontaires
          </p>

          {/* Comment ça marche */}
          <div className="space-y-6 pt-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Comment ça marche&nbsp;?
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
              connecte voyageurs et hôtes pour des séjours authentiques.
              L'hébergement est offert gratuitement par l'hôte, et l'invité peut
              faire un don volontaire en remerciement. L'hôte peut suggérer un
              montant dans son annonce, mais le don reste entièrement optionnel.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              En bref&nbsp;: créez votre profil, échangez via la messagerie,
              confirmez le séjour. Simple, flexible, sécurisé.
            </p>
          </div>

          {/* À propos */}
          <div className="space-y-6 pt-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              À propos de{" "}
              <span className={`${poppins.className} font-bold`}>NomadHub</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Notre mission : rendre l'hospitalité accessible, simple et
              humaine.{" "}
              <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
              connecte voyageurs et hôtes pour des séjours authentiques — basés
              sur la confiance, le respect et la générosité volontaire.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nos valeurs : simplicité, générosité volontaire, authenticité,
              entraide. Nous croyons qu'un séjour réussit quand il crée un lien,
              pas une transaction.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              D'où on vient : l'envie de voyager autrement et d'accueillir sans
              contraintes.{" "}
              <span className={`${poppins.className} font-bold`}>NomadHub</span>{" "}
              est né d'une communauté qui préfère la rencontre aux frais cachés,
              l'échange à la surenchère.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Où on va : bâtir un réseau mondial d'hospitalité bienveillante, où
              chacun peut offrir un canapé ou une chambre selon ses
              disponibilités, en toute sécurité.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/">Voir les annonces</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <Link href="/become-host">Devenir hôte</Link>
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
