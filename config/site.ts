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
      label: "Informations",
      href: "/info",
    },
    {
      label: "Devenir hôte",
      href: "/become-host",
    },
  ],
  navMenuItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Informations",
      href: "/info",
    },
    {
      label: "Devenir hôte",
      href: "/become-host",
    },
    {
      label: "Soutenir",
      href: "/donate",
    },
  ],
};
