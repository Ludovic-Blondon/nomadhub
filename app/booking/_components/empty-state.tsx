import { Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-6">
        <Button
          className="rounded-xl border-border/70 shadow-none hover:shadow-sm"
          variant="outline"
          onClick={() => location.reload()}
        >
          Actualiser
        </Button>
      </div>
    </Card>
  );
}
