"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { deleteRoom } from "../_repository/room.repository";
import { deleteRoomImages } from "../_utils/cloudinary.utils";

import { ActionState } from "@/types";
import { auth } from "@/lib/auth";

export async function handleDeleteRoom(roomId: string): Promise<ActionState> {
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

    const { success, mediaPaths } = await deleteRoom(roomId, session.user.id);

    if (!success) {
      return {
        ok: false,
        message: "Erreur lors de la suppression de la chambre",
        fieldErrors: {},
      };
    }

    // Supprimer les images de Cloudinary en arrière-plan
    // On ne bloque pas la réponse sur cette opération
    if (mediaPaths.length > 0) {
      deleteRoomImages(mediaPaths).catch(() => {
        // Silently handle Cloudinary deletion errors
        // Image cleanup failure doesn't affect user experience
      });
    }

    // Revalider la page des annonces pour mettre à jour la liste
    revalidatePath("/my-listings");

    return {
      ok: true,
      message: "Chambre supprimée avec succès",
      fieldErrors: {},
    };
  } catch {
    return {
      ok: false,
      message: "Erreur inattendue lors de la suppression",
      fieldErrors: { general: "Erreur serveur" },
    };
  }
}
