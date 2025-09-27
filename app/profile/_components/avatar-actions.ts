"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { CloudinaryService } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schemas";

export async function uploadAvatar(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Non authentifié" };
    }

    const file = formData.get("avatar") as File;

    if (!file) {
      return { error: "Aucun fichier fourni" };
    }

    // Validation du type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      return { error: "Type de fichier non autorisé" };
    }

    if (file.size > maxFileSize) {
      return { error: "Fichier trop volumineux (max 2MB)" };
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await CloudinaryService.uploadBase64(base64Data, {
      folder: "avatars",
      public_id: `avatar_${session.user.id}`,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    // Update user avatar in database
    await db
      .update(user)
      .set({ image: result.secure_url })
      .where(eq(user.id, session.user.id));

    // Revalidate profile page
    revalidatePath("/profile");

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch {
    return { error: "Erreur lors de l'upload de l'avatar" };
  }
}

export async function removeAvatar(publicId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Non authentifié" };
    }

    // Delete from Cloudinary if it's a Cloudinary image
    if (
      publicId &&
      (publicId.startsWith("avatars/") || publicId.startsWith("avatar_"))
    ) {
      const deleteResult = await CloudinaryService.deleteFile(publicId);

      // Return debug info temporarily
      if (!deleteResult) {
        return { error: `Échec suppression Cloudinary pour: ${publicId}` };
      }
    }

    // Generate default avatar URL with user initials
    const userName = session.user.name || "User";
    const defaultAvatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`;

    // Update user avatar in database
    await db
      .update(user)
      .set({ image: defaultAvatarUrl })
      .where(eq(user.id, session.user.id));

    // Revalidate profile page
    revalidatePath("/profile");

    return { success: true };
  } catch {
    return { error: "Erreur lors de la suppression de l'avatar" };
  }
}
