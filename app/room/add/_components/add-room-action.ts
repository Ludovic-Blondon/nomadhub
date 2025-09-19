"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createRoomSchema } from "./room.validation";
import { saveImageFile } from "./file-upload.utils";
import { MAX_IMAGES_PER_ROOM } from "./upload.constants";

import { ActionState } from "@/types";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { room, media } from "@/db/schemas";

export async function handleAddRoomSubmit(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      redirect("/sign-in");
    }

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      city: formData.get("city") as string,
      neighborhood: formData.get("neighborhood") as string,
    };

    // Extraire les images
    const images: File[] = [];

    for (let i = 0; i < MAX_IMAGES_PER_ROOM; i++) {
      const image = formData.get(`image-${i}`) as File;

      if (image && image.size > 0) {
        images.push(image);
      }
    }

    // Validation côté serveur
    const validationResult = createRoomSchema.safeParse(rawData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};

      validationResult.error.issues.forEach((error) => {
        if (error.path.length > 0) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });

      return {
        ok: false,
        message: "Erreurs de validation",
        fieldErrors,
        values: rawData,
      };
    }

    const validatedData = validationResult.data;

    // Créer la chambre
    const newRoom = await db
      .insert(room)
      .values({
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        city: validatedData.city,
        neighborhood: validatedData.neighborhood,
        rating: 0,
        authorId: session.user.id,
      })
      .returning();

    const roomId = newRoom[0].id;

    // Sauvegarder les images si elles existent
    if (images.length > 0) {
      const imageRecords = [];

      for (const image of images) {
        try {
          const savedImage = await saveImageFile(image, roomId);

          imageRecords.push({
            name: savedImage.name,
            originalName: savedImage.originalName,
            size: savedImage.size,
            path: savedImage.path,
            mimeType: savedImage.mimeType,
            roomId: roomId,
          });
        } catch {
          // Erreur silencieuse lors de la sauvegarde d'image
        }
      }

      // Insérer les enregistrements d'images dans la base
      if (imageRecords.length > 0) {
        await db.insert(media).values(imageRecords);
      }
    }

    return {
      ok: true,
      message: "Chambre créée avec succès",
      fieldErrors: {},
      data: newRoom[0],
    };
  } catch {
    return {
      ok: false,
      message: "Erreur inattendue lors de la création de la chambre",
      fieldErrors: { general: "Erreur serveur" },
    };
  }
}
