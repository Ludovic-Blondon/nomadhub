"use server";

import { writeFile, mkdir, unlink, access } from "fs/promises";
import { join } from "path";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schemas";

export async function uploadAvatar(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Non autorisé");
    }

    const file = formData.get("avatar") as File;

    if (!file) {
      throw new Error("Aucun fichier fourni");
    }

    // Validation du type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Type de fichier non autorisé");
    }

    if (file.size > maxFileSize) {
      throw new Error("Fichier trop volumineux (max 2MB)");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier pour l'utilisateur
    const userDir = join(
      process.cwd(),
      "public",
      "uploads",
      "avatar",
      session.user.id,
    );

    await mkdir(userDir, { recursive: true });

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `avatar-${timestamp}.${fileExtension}`;
    const filePath = join(userDir, fileName);

    // Écrire le fichier
    await writeFile(filePath, new Uint8Array(buffer));

    // Mettre à jour l'URL de l'avatar en base de données
    const avatarUrl = `/uploads/avatar/${session.user.id}/${fileName}`;

    await db
      .update(user)
      .set({ image: avatarUrl })
      .where(eq(user.id, session.user.id));

    // Revalider la page
    revalidatePath("/profile");

    return {
      success: true,
      avatarUrl,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Erreur lors de l'upload",
    );
  }
}

export async function removeAvatar() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Non autorisé");
    }

    // Récupérer l'avatar actuel de l'utilisateur
    const currentUser = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    // Vérifier si l'avatar actuel est un fichier local (path) et non une URL
    if (
      currentUser[0]?.image &&
      currentUser[0].image.startsWith("/uploads/avatar/")
    ) {
      const filePath = join(process.cwd(), "public", currentUser[0].image);

      try {
        // Vérifier si le fichier existe avant de le supprimer
        await access(filePath);
        await unlink(filePath);
      } catch {
        // Le fichier n'existe pas ou ne peut pas être supprimé
        // On continue sans erreur car l'objectif est de nettoyer la DB
      }
    }

    // Générer l'URL Dicebear avec prénom + nom
    const userName = session.user.name || "User";
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`;

    // Mettre à jour l'URL de l'avatar en base de données
    await db
      .update(user)
      .set({ image: avatarUrl })
      .where(eq(user.id, session.user.id));

    // Revalider la page
    revalidatePath("/profile");

    return {
      success: true,
      avatarUrl,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Erreur lors de la suppression",
    );
  }
}
