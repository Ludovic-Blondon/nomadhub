"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useActionState, useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import { handleAddRoomSubmit } from "./add-room-action";
import { ImageUpload } from "./image-upload";

import { ActionState } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ActionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};

export function AddRoomForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [state, formAction, pending] = useActionState(
    handleAddRoomSubmit,
    initialState,
  );
  const [isPending, startTransition] = useTransition();

  // Redirection côté client après succès
  useEffect(() => {
    if (state.ok && state.data?.id) {
      router.push(`/room/${state.data.id}`);
    }
  }, [state.ok, state.data?.id, router]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Ajouter les images au FormData
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  const isSubmitting = pending || isPending;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une nouvelle chambre</CardTitle>
          <CardDescription>
            Créez une nouvelle annonce pour votre chambre
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!state.ok && state?.message && (
            <Alert aria-live="polite" className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{state.message}</AlertTitle>
              <AlertDescription>
                {Object.entries(state.fieldErrors ?? {})
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <p key={key}>{value}</p>
                  ))}
              </AlertDescription>
            </Alert>
          )}

          {state.ok && state?.message && (
            <Alert aria-live="polite" className="mb-4" variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Succès</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <form noValidate onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.title}
                  defaultValue={(state.values?.title as string) ?? ""}
                  id="title"
                  name="title"
                  placeholder="ex: Belle chambre avec vue sur mer"
                  type="text"
                />
                {state?.fieldErrors?.title && (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.title}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  aria-invalid={!!state?.fieldErrors?.description}
                  className="min-h-[100px]"
                  defaultValue={(state.values?.description as string) ?? ""}
                  id="description"
                  name="description"
                  placeholder="Décrivez votre chambre en détail..."
                />
                {state?.fieldErrors?.description && (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.description}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price">Prix par nuit (€) *</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.price}
                  defaultValue={state.values?.price?.toString() ?? ""}
                  id="price"
                  max="10000"
                  min="1"
                  name="price"
                  placeholder="ex: 50"
                  type="number"
                />
                {state?.fieldErrors?.price && (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.price}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.city}
                  defaultValue={(state.values?.city as string) ?? ""}
                  id="city"
                  name="city"
                  placeholder="ex: Paris"
                  type="text"
                />
                {state?.fieldErrors?.city && (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.city}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="neighborhood">Quartier *</Label>
                <Input
                  aria-invalid={!!state?.fieldErrors?.neighborhood}
                  defaultValue={(state.values?.neighborhood as string) ?? ""}
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="ex: Montmartre"
                  type="text"
                />
                {state?.fieldErrors?.neighborhood && (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.neighborhood}
                  </p>
                )}
              </div>

              <ImageUpload
                error={state?.fieldErrors?.images}
                onImagesChange={setImages}
              />

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Création en cours..." : "Créer la chambre"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
