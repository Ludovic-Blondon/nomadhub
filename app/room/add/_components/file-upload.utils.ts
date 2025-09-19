import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function saveImageFile(
  file: File,
  roomId: string,
): Promise<{
  path: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
}> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Créer le nom de fichier unique
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${randomUUID()}.${fileExtension}`;

  // Créer le chemin du dossier
  const uploadDir = join(process.cwd(), "public", "uploads", "rooms", roomId);

  try {
    await mkdir(uploadDir, { recursive: true });
  } catch {
    // Le dossier existe déjà
  }

  // Chemin complet du fichier
  const filePath = join(uploadDir, fileName);

  // Sauvegarder le fichier
  await writeFile(filePath, new Uint8Array(buffer));

  // Retourner le chemin relatif depuis public
  const relativePath = `/uploads/rooms/${roomId}/${fileName}`;

  return {
    path: relativePath,
    name: fileName,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
  };
}
