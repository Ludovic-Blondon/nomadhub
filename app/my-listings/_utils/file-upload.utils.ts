import { randomUUID } from "crypto";

import { CloudinaryService } from "@/lib/cloudinary";

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
  // Convert file to base64
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Generate unique filename
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${randomUUID()}.${fileExtension}`;

  // Upload to Cloudinary
  const result = await CloudinaryService.uploadBase64(base64Data, {
    folder: `rooms/${roomId}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return {
    path: result.secure_url,
    name: fileName,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
  };
}
