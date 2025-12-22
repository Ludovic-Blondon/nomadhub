import { eq, inArray } from "drizzle-orm";

import { ImageUpdateData } from "../_components/image-types";

import {
  MAX_IMAGES_PER_ROOM,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "./upload.constants";
import { saveImageFile } from "./file-upload.utils";
import { deleteRoomImages } from "./cloudinary.utils";

import { db } from "@/db";
import { media } from "@/db/schemas/room";

export interface ImageUpdateResult {
  success: boolean;
  message: string;
  uploadedCount?: number;
  deletedCount?: number;
  errors?: string[];
}

export interface GranularImageUpdateResult {
  success: boolean;
  message: string;
  uploadedImages?: Array<{ id: string; path: string; order: number }>;
  deletedImages?: string[];
  updatedOrder?: Array<{ id: string; order: number }>;
  errors?: string[];
}

/**
 * Remplace toutes les images d'une chambre par de nouvelles images
 */
export async function replaceRoomImages(
  roomId: string,
  newImages: File[],
): Promise<ImageUpdateResult> {
  try {
    // 1. Récupérer les images actuelles pour les supprimer de Cloudinary
    const existingMedias = await db.query.media.findMany({
      where: eq(media.roomId, roomId),
    });

    const existingPaths = existingMedias.map((m) => m.path);

    // 2. Supprimer les enregistrements en base de données
    if (existingMedias.length > 0) {
      await db.delete(media).where(eq(media.roomId, roomId));
    }

    // 3. Upload des nouvelles images
    const imageRecords = [];
    let uploadedCount = 0;

    for (const image of newImages) {
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

        uploadedCount++;
      } catch {
        // En cas d'erreur sur une image, on continue avec les autres
        // Silently handle individual image upload failures
      }
    }

    // 4. Insérer les nouveaux enregistrements
    if (imageRecords.length > 0) {
      await db.insert(media).values(imageRecords);
    }

    // 5. Supprimer les anciennes images de Cloudinary en arrière-plan
    if (existingPaths.length > 0) {
      deleteRoomImages(existingPaths).catch(() => {
        // Gestion silencieuse des erreurs Cloudinary
      });
    }

    return {
      success: true,
      message: `${uploadedCount} image(s) mise(s) à jour avec succès`,
      uploadedCount,
      deletedCount: existingPaths.length,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de la mise à jour des images",
      errors: [error instanceof Error ? error.message : "Erreur inconnue"],
    };
  }
}

/**
 * Formate une erreur de manière cohérente
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }

  return "Erreur inconnue";
}

/**
 * Valide les images avant upload
 */
export function validateImages(images: File[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (images.length === 0) {
    errors.push("Aucune image sélectionnée");
  }

  if (images.length > MAX_IMAGES_PER_ROOM) {
    errors.push(`Maximum ${MAX_IMAGES_PER_ROOM} images autorisées`);
  }

  for (const image of images) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.type as any)) {
      errors.push(
        `Format non supporté: ${image.name} (formats acceptés: JPEG, PNG, WebP)`,
      );
    }

    if (image.size > MAX_FILE_SIZE) {
      const maxSizeMB = Math.round(MAX_FILE_SIZE / 1024 / 1024);

      errors.push(
        `Image trop volumineuse: ${image.name} (maximum ${maxSizeMB}MB)`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Mise à jour granulaire des images d'une chambre
 * Permet de supprimer, ajouter et réorganiser les images de façon sélective
 */
export async function updateRoomImagesGranular(
  roomId: string,
  updateData: ImageUpdateData,
): Promise<GranularImageUpdateResult> {
  const errors: string[] = [];
  const uploadedImages: Array<{ id: string; path: string; order: number }> = [];
  let deletedImages: string[] = [];
  let updatedOrder: Array<{ id: string; order: number }> = [];

  try {
    // 1. Validation des nouvelles images
    if (updateData.imagesToUpload.length > 0) {
      const validation = validateImages(updateData.imagesToUpload);

      if (!validation.isValid) {
        return {
          success: false,
          message: "Erreurs de validation des images",
          errors: validation.errors,
        };
      }
    }

    // 2. Supprimer les images marquées pour suppression
    if (updateData.imagesToDelete.length > 0) {
      try {
        // Récupérer les chemins Cloudinary avant suppression
        const mediasToDelete = await db.query.media.findMany({
          where: inArray(media.id, updateData.imagesToDelete),
        });

        const pathsToDelete = mediasToDelete.map((m) => m.path);

        // Supprimer de la base de données
        await db
          .delete(media)
          .where(inArray(media.id, updateData.imagesToDelete));

        deletedImages = updateData.imagesToDelete;

        // Supprimer de Cloudinary en arrière-plan
        if (pathsToDelete.length > 0) {
          deleteRoomImages(pathsToDelete).catch(() => {
            // Gestion silencieuse des erreurs Cloudinary
          });
        }
      } catch (error) {
        errors.push(`Erreur lors de la suppression: ${formatError(error)}`);
      }
    }

    // 3. Upload des nouvelles images
    if (updateData.imagesToUpload.length > 0) {
      for (let i = 0; i < updateData.imagesToUpload.length; i++) {
        const file = updateData.imagesToUpload[i];

        try {
          const savedImage = await saveImageFile(file, roomId);

          const [insertedMedia] = await db
            .insert(media)
            .values({
              name: savedImage.name,
              originalName: savedImage.originalName,
              size: savedImage.size,
              path: savedImage.path,
              mimeType: savedImage.mimeType,
              roomId: roomId,
            })
            .returning();

          uploadedImages.push({
            id: insertedMedia.id,
            path: savedImage.path,
            order: updateData.imageOrder.length + i,
          });
        } catch (error) {
          errors.push(`Erreur upload ${file.name}: ${formatError(error)}`);
        }
      }
    }

    // 4. Mise à jour de l'ordre des images (si spécifié)
    if (updateData.imageOrder.length > 0) {
      try {
        // Cette partie sera implémentée quand on aura un champ "order" dans le schéma
        // Pour l'instant, on garde l'ordre naturel (par date de création)
        updatedOrder = updateData.imageOrder;
      } catch (error) {
        errors.push(`Erreur réorganisation: ${formatError(error)}`);
      }
    }

    const hasErrors = errors.length > 0;
    const uploadedCount = uploadedImages.length;
    const deletedCount = deletedImages.length;

    return {
      success: !hasErrors || uploadedCount > 0 || deletedCount > 0, // Succès partiel accepté
      message: hasErrors
        ? `Mise à jour partielle: ${uploadedCount} ajoutées, ${deletedCount} supprimées (avec erreurs)`
        : `Mise à jour réussie: ${uploadedCount} ajoutées, ${deletedCount} supprimées`,
      uploadedImages,
      deletedImages,
      updatedOrder,
      errors: hasErrors ? errors : undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de la mise à jour granulaire des images",
      errors: [formatError(error)],
    };
  }
}
