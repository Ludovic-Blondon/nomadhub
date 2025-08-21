import Link from "next/link";
import {
  Users,
  Home,
  Heart,
  Shield,
  MessageCircle,
  Star,
  Globe,
  Sparkles,
  ArrowRight,
  Check,
  Gift,
  MapPin,
  Calendar,
  Zap,
  UserCheck,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {
  return (
    <section className="w-full">
      {/* Hero Section avec gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 dark:from-primary/10 dark:via-secondary/10 dark:to-primary/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl dark:bg-secondary/20" />

        <div className="relative container max-w-6xl px-4 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              La communauté qui réinvente l&apos;hospitalité
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Comment ça marche ?
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              <span className="font-semibold text-foreground">NomadHub</span>{" "}
              connecte voyageurs et hôtes pour des séjours authentiques.
              <span className="block mt-2">
                Partagez gratuitement, remerciez librement.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="text-lg px-8 group" size="lg">
                <Link href="/signup">
                  Rejoindre la communauté
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                className="text-lg px-8"
                size="lg"
                variant="outline"
              >
                <Link href="/">Explorer les annonces</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="border-y bg-muted/30 dark:bg-muted/10">
        <div className="container max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                50K+
              </div>
              <div className="text-muted-foreground mt-1">Membres actifs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                120+
              </div>
              <div className="text-muted-foreground mt-1">Villes couvertes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                4.8★
              </div>
              <div className="text-muted-foreground mt-1">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                100%
              </div>
              <div className="text-muted-foreground mt-1">Gratuit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container max-w-6xl px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <Zap className="w-3 h-3 mr-1" />
            Simple et rapide
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            3 étapes pour commencer
          </h2>
          <p className="text-xl text-muted-foreground">
            Rejoignez l&apos;aventure en quelques minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader>
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <CardTitle className="text-2xl">
                Créez votre profil unique
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Photo, bio, passions... Montrez qui vous êtes vraiment. Un
                profil authentique = des connexions authentiques.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                  Vérification d&apos;identité
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                  Photos et centres d&apos;intérêt
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                  Préférences de voyage
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />
            <CardHeader>
              <div className="w-14 h-14 bg-secondary/10 dark:bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <CardTitle className="text-2xl">Connectez-vous</CardTitle>
              <CardDescription className="text-base mt-2">
                Trouvez l&apos;hébergement parfait ou accueillez des voyageurs.
                Filtrez par ville, dates et type de couchage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 text-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Voyageur</div>
                </div>
                <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-4 text-center hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors">
                  <Home className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-medium">Hôte</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Canapé • Chambre • Lit d&apos;appoint
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader>
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                3
              </div>
              <CardTitle className="text-2xl">
                Vivez l&apos;expérience
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Échangez, séjournez, partagez. Laissez un avis et, si le cœur
                vous en dit, un don pour remercier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Don moyen</span>
                    <span className="text-lg font-bold text-primary">
                      15-25€
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    100% optionnel
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <Gift className="w-5 h-5 text-primary" />
                Un geste, pas une obligation
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-muted/30 dark:bg-muted/10 py-20">
        <div className="container max-w-6xl px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <Star className="w-3 h-3 mr-1" />
              Nos avantages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Pourquoi choisir NomadHub ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Des avantages uniques pour une expérience inoubliable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>100% Gratuit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  L&apos;hébergement est gratuit. Les dons sont optionnels.
                  Voyagez sans vous ruiner.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Profils vérifiés, avis publics, messagerie sécurisée et
                  système de signalement.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rencontrez des locaux, partagez des expériences, créez des
                  amitiés durables.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Authentique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vivez comme un local, découvrez les secrets cachés, sortez des
                  sentiers battus.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle>Flexible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Une nuit ou plus, selon vos besoins. Réservez ou annulez
                  facilement.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle>Support 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Équipe dédiée, messagerie intégrée, assistance en cas de
                  besoin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container max-w-4xl px-4 py-20">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <MessageCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tout ce que vous devez savoir pour commencer
          </p>
        </div>

        <Card className="overflow-hidden">
          <Accordion collapsible className="w-full" type="single">
            <AccordionItem className="px-6" value="item-1">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Le don est-il vraiment optionnel ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Oui, 100% optionnel ! Le séjour est gratuit. Le don est un
                simple geste de remerciement si vous le souhaitez. Aucune
                pression, aucune obligation. C&apos;est l&apos;esprit de partage
                qui compte avant tout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-6" value="item-2">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Comment puis-je définir mes règles en tant qu&apos;hôte ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Vous avez le contrôle total ! Définissez vos horaires, les
                espaces accessibles, la durée maximale du séjour, les règles
                concernant le tabac, les animaux, le bruit... Soyez clair et
                précis dans votre annonce pour éviter tout malentendu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-6" value="item-3">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Comment garantissez-vous la sécurité ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Nous avons mis en place plusieurs niveaux de sécurité :
                vérification des profils, système d&apos;avis publics,
                messagerie sécurisée intégrée, et un système de signalement
                rapide. Nous encourageons toujours à suivre votre intuition et à
                communiquer avant tout séjour.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-6" value="item-4">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Puis-je annuler une réservation ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Oui, les hôtes comme les voyageurs peuvent annuler une
                réservation. Nous encourageons une communication ouverte et
                honnête. En cas d&apos;imprévu, prévenez l&apos;autre partie le
                plus tôt possible. La flexibilité et la compréhension mutuelle
                font partie de l&apos;esprit NomadHub.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-6" value="item-5">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Comment fonctionne le système d&apos;avis ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Après chaque séjour, l&apos;hôte et le voyageur peuvent laisser
                un avis public sur leur expérience. Ces avis sont visibles sur
                les profils et aident la communauté à faire des choix éclairés.
                Soyez honnête et constructif dans vos retours !
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-6" value="item-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-lg font-semibold">
                  Que faire en cas de problème ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Notre équipe support est disponible 24/7. Utilisez le bouton de
                signalement dans l&apos;app ou contactez-nous directement. Nous
                prenons tous les signalements au sérieux et intervenons
                rapidement pour résoudre les conflits et assurer la sécurité de
                notre communauté.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden border-t">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20" />
        <div className="relative container max-w-4xl px-4 py-20 text-center">
          <Badge className="mb-6" variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Rejoignez-nous
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers de voyageurs et d&apos;hôtes qui partagent
            déjà l&apos;esprit NomadHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="text-lg px-8" size="lg">
              <Link href="/signup">
                <UserCheck className="mr-2 w-5 h-5" />
                Créer mon profil gratuit
              </Link>
            </Button>
            <Button
              asChild
              className="text-lg px-8"
              size="lg"
              variant="outline"
            >
              <Link href="/testimonials">
                <Star className="mr-2 w-5 h-5" />
                Voir les témoignages
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Inscription en 2 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Toujours gratuit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
