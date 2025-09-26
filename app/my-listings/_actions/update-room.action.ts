"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { createRoomSchema } from "../_validations/room.validation";
import { updateRoom } from "../_repository/room.repository";

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
