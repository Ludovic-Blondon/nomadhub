import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DonatePage() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="container max-w-3xl px-4 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Soutenir NomadHub
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Aidez-nous à faire grandir une communauté d’hospitalité libre et
            bienveillante. Votre don soutient l’hébergement, le développement et
            la modération — sans publicité, ni frais cachés.
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Montant libre, 100% optionnel. Merci pour votre confiance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild className="w-full sm:w-auto" size="lg">
              {/* Remplace /donate par l’URL de ton checkout (Stripe, etc.) */}
              <Link href="/donate">Faire un don</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <Link href="/">Voir les annonces</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Transparent, sécurisé et réversible à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
