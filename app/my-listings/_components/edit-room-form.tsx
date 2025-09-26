"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useActionState, useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { handleUpdateRoom } from "../_actions/update-room.action";

import { ImageManager } from "./image-manager";
import { ImageUpdateData } from "./image-types";

import { RoomWithRelations, ActionState } from "@/types";
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

interface EditRoomFormProps extends React.ComponentProps<"div"> {
  room: RoomWithRelations;
}

export function EditRoomForm({ room, className, ...props }: EditRoomFormProps) {
  const router = useRouter();
  const [imageUpdateData, setImageUpdateData] =
    useState<ImageUpdateData | null>(null);
  const [state, formAction, pending] = useActionState(
    handleUpdateRoom.bind(null, room.id),
    initialState,
  );
  const [isPending, startTransition] = useTransition();

  // Redirection côté client après succès
  useEffect(() => {
    if (state.ok) {
      router.push("/my-listings");
    }
  }, [state.ok, router]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Ajouter les données d'images si présentes
    if (imageUpdateData) {
      formData.append("imageUpdateData", JSON.stringify(imageUpdateData));

      // Ajouter les fichiers d'images
      imageUpdateData.imagesToUpload.forEach((file, index) => {
        formData.append(`newImage-${index}`, file);
      });
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  const isSubmitting = pending || isPending;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Modifier l'annonce</CardTitle>
          <CardDescription>
            Modifiez les informations de votre chambre
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
                  defaultValue={(state.values?.title as string) ?? room.title}
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
                  defaultValue={
                    (state.values?.description as string) ?? room.description
                  }
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
                  defaultValue={
                    state.values?.price?.toString() ?? room.price.toString()
                  }
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
                  defaultValue={(state.values?.city as string) ?? room.city}
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
                  defaultValue={
                    (state.values?.neighborhood as string) ?? room.neighborhood
                  }
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

              {/* Section Images */}
              <div className="grid gap-6 border-t pt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Images de l'annonce
                  </h3>

                  <ImageManager
                    disabled={isSubmitting}
                    room={room}
                    onImageDataChange={setImageUpdateData}
                  />

                  {state?.fieldErrors?.images && (
                    <p className="text-sm text-destructive mt-2">
                      {state.fieldErrors.images}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
