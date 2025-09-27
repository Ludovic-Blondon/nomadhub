"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { createRoomSchema } from "../_validations/room.validation";
import { updateRoom } from "../_repository/room.repository";
import {
  validateImages,
  updateRoomImagesGranular,
  formatError,
} from "../_utils/image-management.utils";
import { ImageUpdateData } from "../_components/image-types";
import { MAX_IMAGES_PER_ROOM } from "../_utils/upload.constants";

import { ActionState } from "@/types";
import { auth } from "@/lib/auth";

export async function handleUpdateRoom(
  roomId: string,
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

    if (!roomId || roomId.trim() === "") {
      return {
        ok: false,
        message: "ID de chambre invalide",
        fieldErrors: {},
      };
    }

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      city: formData.get("city") as string,
      neighborhood: formData.get("neighborhood") as string,
    };

    // Vérifier si on a des données d'images à traiter
    const imageUpdateDataString = formData.get("imageUpdateData") as string;
    let imageUpdateData: ImageUpdateData | null = null;

    if (imageUpdateDataString) {
      try {
        imageUpdateData = JSON.parse(imageUpdateDataString) as ImageUpdateData;

        // Récupérer les fichiers d'images
        const newImages: File[] = [];

        for (let i = 0; i < MAX_IMAGES_PER_ROOM; i++) {
          const file = formData.get(`newImage-${i}`) as File;

          if (file && file.size > 0) {
            newImages.push(file);
          }
        }

        // Mettre à jour les fichiers dans imageUpdateData
        imageUpdateData.imagesToUpload = newImages;

        // Valider les nouvelles images si présentes
        if (newImages.length > 0) {
          const imageValidation = validateImages(newImages);

          if (!imageValidation.isValid) {
            return {
              ok: false,
              message: "Erreurs de validation des images",
              fieldErrors: { images: imageValidation.errors.join(", ") },
              values: rawData,
            };
          }
        }
      } catch (error: unknown) {
        return {
          ok: false,
          message: "Erreur dans les données d'images",
          fieldErrors: { images: formatError(error) },
          values: rawData,
        };
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

    // Mettre à jour la chambre
    const updatedRoom = await updateRoom(roomId, session.user.id, {
      title: validatedData.title,
      description: validatedData.description,
      price: validatedData.price,
      city: validatedData.city,
      neighborhood: validatedData.neighborhood,
    });

    if (!updatedRoom) {
      return {
        ok: false,
        message:
          "Chambre non trouvée ou vous n'avez pas les droits pour la modifier",
        fieldErrors: {},
      };
    }

    // Mettre à jour les images si demandé
    if (imageUpdateData) {
      const hasChanges =
        imageUpdateData.imagesToDelete.length > 0 ||
        imageUpdateData.imagesToUpload.length > 0 ||
        imageUpdateData.imageOrder.length > 0;

      if (hasChanges) {
        const imageResult = await updateRoomImagesGranular(
          roomId,
          imageUpdateData,
        );

        if (!imageResult.success) {
          return {
            ok: false,
            message: `Chambre mise à jour mais erreur images: ${imageResult.message}`,
            fieldErrors: {
              images: imageResult.errors?.join(", ") || "Erreur inconnue",
            },
          };
        }
      }
    }

    // Revalider les pages concernées
    revalidatePath("/my-listings");
    revalidatePath(`/my-listings/${roomId}/edit`);
    revalidatePath(`/room/${roomId}`);

    return {
      ok: true,
      message: "Chambre mise à jour avec succès",
      fieldErrors: {},
      data: updatedRoom,
    };
  } catch {
    return {
      ok: false,
      message: "Erreur inattendue lors de la mise à jour",
      fieldErrors: { general: "Erreur serveur" },
    };
  }
}
