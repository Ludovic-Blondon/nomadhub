import { CloudinaryService } from "@/lib/cloudinary";

/**
 * Extrait le public_id depuis une URL Cloudinary
 * URL format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
 */
export function extractPublicIdFromUrl(cloudinaryUrl: string): string | null {
  try {
    const url = new URL(cloudinaryUrl);

    // Vérifier que c'est bien une URL Cloudinary
    if (!url.hostname.includes("cloudinary.com")) {
      return null;
    }

    // Extraire le chemin et retirer les segments standards
    const pathSegments = url.pathname.split("/");

    // Format: /{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
    // Ou: /{cloud_name}/{resource_type}/upload/{public_id}.{format}
    const uploadIndex = pathSegments.indexOf("upload");

    if (uploadIndex === -1) {
      return null;
    }

    // Le public_id est après 'upload' et potentiellement après v{version}
    let publicIdIndex = uploadIndex + 1;

    // Si le segment suivant commence par 'v' suivi de chiffres, c'est une version
    if (pathSegments[publicIdIndex]?.match(/^v\d+$/)) {
      publicIdIndex++;
    }

    if (publicIdIndex >= pathSegments.length) {
      return null;
    }

    // Récupérer tous les segments restants et les joindre
    const publicIdSegments = pathSegments.slice(publicIdIndex);
    const lastSegment = publicIdSegments[publicIdSegments.length - 1];

    // Retirer l'extension du dernier segment
    if (lastSegment?.includes(".")) {
      const lastSegmentWithoutExt = lastSegment.split(".")[0];

      publicIdSegments[publicIdSegments.length - 1] = lastSegmentWithoutExt;
    }

    return publicIdSegments.join("/");
  } catch {
    return null;
  }
}

/**
 * Supprime les images Cloudinary associées à une chambre
 */
export async function deleteRoomImages(mediaPaths: string[]): Promise<{
  success: boolean;
  deletedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let deletedCount = 0;

  if (mediaPaths.length === 0) {
    return { success: true, deletedCount: 0, errors: [] };
  }

  // Extraire les public_ids depuis les URLs
  const publicIds: string[] = [];

  for (const path of mediaPaths) {
    const publicId = extractPublicIdFromUrl(path);

    if (publicId) {
      publicIds.push(publicId);
    } else {
      errors.push(`Impossible d'extraire le public_id de: ${path}`);
    }
  }

  if (publicIds.length === 0) {
    return {
      success: false,
      deletedCount: 0,
      errors: ["Aucun public_id valide trouvé"],
    };
  }

  try {
    // Utiliser la suppression en batch pour plus d'efficacité
    const result = await CloudinaryService.deleteFiles(publicIds);

    deletedCount = result.deleted.length;

    // Ajouter les erreurs pour les fichiers non trouvés
    if (result.not_found.length > 0) {
      errors.push(...result.not_found.map((id) => `Fichier non trouvé: ${id}`));
    }

    return {
      success: deletedCount > 0,
      deletedCount,
      errors,
    };
  } catch (error) {
    errors.push(
      `Erreur lors de la suppression: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
    );

    return {
      success: false,
      deletedCount: 0,
      errors,
    };
  }
}
