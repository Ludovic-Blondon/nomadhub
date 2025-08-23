export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NomadHub",
  description:
    "NomadHub connecte voyageurs et hôtes pour des séjours authentiques.",
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
    {
      label: "Soutenir",
      href: "/donate",
    },
  ],
};
