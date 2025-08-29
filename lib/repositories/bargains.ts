import "server-only";
import { Room } from "@/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const room = {
  title: "Magnifique canapé lit chez William - Salon",
  city: "Paris",
  neighborhood: "1er arrondissement",
  rating: 4.5,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim. Sed euismod, enim eu consectetur cursus, enim erat dictum erat, nec dictum enim enim euismod enim.",
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
  author: {
    name: "John Doe",
    avatarUrl: "https://github.com/shadcn.png",
  },
};

export async function getRoomById(id: number): Promise<Room> {
  await sleep(300);

  return { id, ...room };
}
