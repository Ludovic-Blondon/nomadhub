import { MapPin } from "lucide-react";

import Breadcrumb from "@/app/ui/breadcrumb";
import { Caroussel } from "@/app/ui/caroussel";
import { Button } from "@/components/ui/button";

export default async function Bargain({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bargain = {
    id: 1,
    title: "Loue clic-clac dans le salon",
    city: "Paris",
    neighborhood: "1er arrondissement",
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
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 space-y-4">
        <Breadcrumb id={id} />
        <div className="space-y-4">
          <div className="justify-center flex items-center">
            <Caroussel bargain={bargain} />
          </div>
          <div className="justify-center flex items-center max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">{bargain.title}</div>
              <div className="text-md text-gray-500">
                <div className="flex flex-row gap-2 justify-between">
                  <div className="flex flex-row gap-2">
                    <MapPin className="w-4 h-4" />
                    <div className="text-md text-gray-500">
                      {bargain.city} - {bargain.neighborhood}
                    </div>
                  </div>

                  <div className="text-md text-gray-500">
                    {bargain.price} € / nuit
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{bargain.description}</div>
              <div className="text-sm text-gray-500">
                <Button className="w-full cursor-pointer">
                  Reservé sur le site
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
