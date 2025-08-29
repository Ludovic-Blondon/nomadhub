import { Booking } from "@/types";

export const guestBookings: Booking[] = [
  {
    id: 1,
    status: "pending",
    startDate: "2025-08-20",
    endDate: "2025-08-22",
    room: {
      id: 1,
      title: "Magnifique canapé lit chez William - Salon",
      city: "Paris",
      neighborhood: "1er arrondissement",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
      price: 20,
      images: [
        "/images/pexels-chaitaastic-1918291-optimized.jpeg",
        "/images/pexels-fotoaibe-813692-optimized.jpeg",
        "/images/pexels-fotoaibe-1571460-optimized.jpeg",
        "/images/pexels-fotoaibe-1571468-optimized.jpeg",
        "/images/pexels-fotoaibe-1643384-optimized.jpeg",
      ],
      reviews: [
        {
          id: "1",
          rating: 4.5,
          title: "Très bon produit",
          body: "Qualité au rendez-vous, livraison rapide.",
          createdAt: "2025-08-01T10:00:00.000Z",
          author: { name: "Marie Dupont" },
        },
        {
          id: "2",
          rating: 3,
          body: "Fait le job, mais peut mieux faire.",
          createdAt: "2025-08-10T12:30:00.000Z",
          author: { name: "Alex Martin" },
        },
      ],
      author: { name: "John Doe", avatarUrl: "https://github.com/shadcn.png" },
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 2,
    status: "confirmed",
    startDate: "2025-08-28",
    endDate: "2025-08-30",
    room: {
      id: 2,
      title: "Studio cozy au cœur de Montmartre",
      city: "Paris",
      neighborhood: "18e arrondissement",
      rating: 4.8,
      price: 45,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Sophie Martin",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 3,
    status: "cancelled",
    startDate: "2024-11-20",
    endDate: "2024-11-22",
    room: {
      id: 3,
      title: "Appartement moderne près de la gare",
      city: "Lyon",
      neighborhood: "Part-Dieu",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Pierre Dubois",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 4,
    status: "completed",
    startDate: "2024-12-01",
    endDate: "2024-12-02",
    room: {
      id: 4,
      title: "Magnifique canapé lit chez William - Salon",
      city: "Paris",
      neighborhood: "1er arrondissement",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Pierre Dubois",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 5,
    status: "rejected",
    startDate: "2024-12-01",
    endDate: "2024-12-02",
    room: {
      id: 4,
      title: "Magnifique canapé lit chez Jean - Salon",
      city: "Lyon",
      neighborhood: "5e arrondissement",
      rating: 4.2,
      price: 35,
      images: ["/images/pexels-chaitaastic-1918291-optimized.jpeg"],
      author: {
        name: "Jean Dupont",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
];

export const hostBookings: Booking[] = [
  {
    id: 101,
    status: "pending",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    room: {
      id: 42,
      title: "Loft lumineux Canal Saint-Martin",
      city: "Paris",
      neighborhood: "10e arrondissement",
      rating: 4.9,
      price: 80,
      images: ["/images/pexels-fotoaibe-813692-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Demande en attente : l'hôte peut accepter ou refuser la réservation.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 102,
    status: "rejected",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    room: {
      id: 43,
      title: "T2 design proche Bellecour",
      city: "Lyon",
      neighborhood: "2e arrondissement",
      rating: 4.6,
      price: 65,
      images: ["/images/pexels-fotoaibe-1571460-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description: "Demande refusée : l'hôte a refusé la réservation.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 104,
    status: "confirmed",
    startDate: "2025-09-18",
    endDate: "2025-09-20",
    room: {
      id: 45,
      title: "T2 design proche Bellecour",
      city: "Lyon",
      neighborhood: "2e arrondissement",
      rating: 4.6,
      price: 65,
      images: ["/images/pexels-fotoaibe-1571460-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description:
        "Séjour confirmé : vous pouvez envoyer des instructions d'arrivée.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
  {
    id: 103,
    status: "completed",
    startDate: "2025-05-02",
    endDate: "2025-05-05",
    room: {
      id: 44,
      title: "Studio cosy Vieux-Lille",
      city: "Lille",
      neighborhood: "Vieux-Lille",
      rating: 4.3,
      price: 55,
      images: ["/images/pexels-fotoaibe-1571468-optimized.jpeg"],
      author: {
        name: "— Vous êtes l'hôte —",
        avatarUrl: "https://github.com/shadcn.png",
      },
      description: "Séjour achevé : pensez à laisser un avis invité.",
    },
    guest: {
      name: "Jacques Doe",
      avatarUrl: "https://github.com/shadcn.png",
    },
  },
];
