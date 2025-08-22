export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Réservation",
      href: "/booking",
    },
    {
      label: "Comment ça marche ?",
      href: "/how-it-works",
    },
    {
      label: "Devenir hôte",
      href: "/become-host",
    },
    {
      label: "A propos",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Réservation",
      href: "/booking",
    },
    {
      label: "Comment ça marche ?",
      href: "/how-it-works",
    },
    {
      label: "Devenir hôte",
      href: "/become-host",
    },
    {
      label: "A propos",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
