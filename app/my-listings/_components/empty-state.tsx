import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-default-100 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-default-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Aucune annonce pour le moment
          </h3>
          <p className="text-default-500 mb-6">
            Créez votre première annonce pour commencer à accueillir des
            voyageurs.
          </p>
          <Button asChild>
            <Link href="/my-listings/create">Créer ma première annonce</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
