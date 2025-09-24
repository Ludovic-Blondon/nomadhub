"use server";

import { writeFile, mkdir } from "fs/promises";
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

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Type de fichier non autorisé");
    }

    // Validation de la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Fichier trop volumineux (max 2MB)");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier pour l'utilisateur
    const userDir = join(
      process.cwd(),
      "public",
      "upload",
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
    const avatarUrl = `/upload/avatar/${session.user.id}/${fileName}`;

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

    // Générer l'URL Dicebear avec prénom + nom
    const userName = session.user.name || "User";
    const seed = encodeURIComponent(userName);
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;

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
