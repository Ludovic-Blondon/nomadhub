import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schemas";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 },
      );
    }

    // Validation du type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé" },
        { status: 400 },
      );
    }

    // Validation de la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fichier trop volumineux (max 2MB)" },
        { status: 400 },
      );
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

    return NextResponse.json({
      success: true,
      avatarUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
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

    return NextResponse.json({
      success: true,
      avatarUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 },
    );
  }
}
