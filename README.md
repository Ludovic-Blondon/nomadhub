# 🏠 NomadHub

> Une plateforme de réservation d'hébergements qui connecte voyageurs et hôtes pour des séjours authentiques.

## 🚀 Aperçu

NomadHub est une application web moderne de location d'hébergements développée avec Next.js 15, offrant une expérience utilisateur fluide pour la réservation de logements et la gestion d'hébergements.

### ✨ Fonctionnalités principales

- **🔍 Recherche d'hébergements** - Parcourez et découvrez des logements authentiques
- **📱 Interface responsive** - Expérience optimisée sur tous les appareils
- **🔐 Authentification sécurisée** - Système d'authentification avec Better Auth
- **👤 Gestion de profil** - Upload d'avatar, gestion des informations personnelles
- **🏡 Espace hôte** - Ajout et gestion d'hébergements
- **📅 Système de réservation** - Réservation en temps réel avec gestion des dates
- **⭐ Avis et évaluations** - Système de reviews pour les hébergements
- **🌙 Mode sombre** - Interface adaptative avec support du thème sombre

## 🛠️ Stack technique

### Frontend
- **Next.js 15** - Framework React avec App Router
- **React 18** - Librairie UI avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour un code robuste
- **HeroUI v2** - Composants UI modernes basés sur React Aria
- **Shadcn/ui** - Composants UI accessibles et personnalisables
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides

### Backend & Database
- **PostgreSQL** - Base de données relationnelle via Neon
- **Drizzle ORM** - ORM TypeScript-first avec typage complet
- **Better Auth** - Système d'authentification moderne
- **Server Actions** - Actions serveur Next.js pour les mutations

### Outils de développement
- **pnpm** - Gestionnaire de paquets rapide et efficace
- **ESLint** - Linter avec règles personnalisées
- **Prettier** - Formateur de code automatique
- **Turbopack** - Bundler ultra-rapide pour le développement

## 📁 Structure du projet

```
nomadhub/
├── app/                     # App Router Next.js
│   ├── booking/            # Pages de réservation
│   ├── profile/            # Gestion du profil utilisateur
│   ├── room/               # Pages des hébergements
│   │   ├── [id]/          # Page détail d'un hébergement
│   │   └── add/           # Ajout d'hébergement
│   ├── sign-up/           # Inscription
│   ├── become-host/       # Onboarding hôte
│   └── _components/       # Composants partagés
├── components/             # Composants UI réutilisables
│   └── ui/                # Composants de base (shadcn/ui)
├── lib/                   # Logique métier
│   ├── repositories/      # Couche d'accès aux données
│   ├── actions/          # Server Actions
│   └── auth.ts           # Configuration d'authentification
├── db/                    # Configuration base de données
│   └── schemas/          # Schémas Drizzle ORM
├── config/               # Configuration application
└── types/               # Définitions TypeScript
```

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- pnpm (recommandé)
- Base de données PostgreSQL (Neon)

### Installation

```bash
# Cloner le repository
git clone <your-repo-url>
cd nomadhub

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos configurations
```

### Configuration de l'environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
# Base de données
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Autres configurations...
```

### Commandes de développement

```bash
# Développement (avec Turbopack)
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start

# Linting avec auto-fix
pnpm lint

# Vérification TypeScript
pnpm type:check

# Migrations base de données
pnpm migration:generate  # Générer une migration
pnpm migration:migrate   # Appliquer les migrations
pnpm migration:studio    # Interface Drizzle Studio
```

## 🗄️ Base de données

Le projet utilise **Drizzle ORM** avec PostgreSQL. Les principales entités sont :

- **User** - Utilisateurs et authentification
- **Room** - Hébergements avec détails et localisation
- **Booking** - Réservations avec dates et statuts
- **Review** - Avis et évaluations des hébergements

### Migrations

```bash
# Générer une nouvelle migration après modification des schémas
pnpm migration:generate

# Appliquer les migrations
pnpm migration:migrate

# Explorer la base avec l'interface web
pnpm migration:studio
```

## 🎨 Interface utilisateur

L'interface est construite avec **HeroUI v2**, offrant :

- Composants accessibles (React Aria)
- Thème sombre/clair automatique
- Design système cohérent
- Animations fluides avec Framer Motion

### Configuration pnpm

Le fichier `.npmrc` est configuré pour HeroUI :

```
public-hoist-pattern[]=*@heroui/*
```

## 🔐 Authentification

Le système d'authentification utilise **Better Auth** avec :

- Authentification par email/mot de passe
- Sessions sécurisées
- Intégration Drizzle ORM
- Gestion des profils utilisateur

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement dans le dashboard Vercel
```

### Variables d'environnement de production

Assurez-vous de configurer toutes les variables d'environnement nécessaires :

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

## 🧪 Tests et qualité

```bash
# Linting
pnpm lint

# Vérification TypeScript
pnpm type:check
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

Pour toute question ou problème :

1. Consultez la [documentation Next.js](https://nextjs.org/docs)
2. Visitez la [documentation HeroUI](https://heroui.com/)
3. Ouvrez une issue sur GitHub

---

Développé avec ❤️ pour la communauté des nomades numériques