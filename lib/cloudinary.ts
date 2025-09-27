import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  transformation?: any[];
  resource_type?: "image" | "video" | "raw" | "auto";
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

export class CloudinaryService {
  static async uploadFile(
    file: File | Buffer | string,
    options: UploadOptions = {},
  ): Promise<UploadResult> {
    try {
      const uploadOptions = {
        folder: options.folder || "avatars",
        resource_type: options.resource_type || "auto",
        ...options,
      };

      const result = await cloudinary.uploader.upload(
        file as string,
        uploadOptions,
      );

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
      };
    } catch {
      throw new Error("Failed to upload file to Cloudinary");
    }
  }

  static async uploadBase64(
    base64Data: string,
    options: UploadOptions = {},
  ): Promise<UploadResult> {
    try {
      const uploadOptions = {
        folder: options.folder || "avatars",
        resource_type: options.resource_type || "auto",
        ...options,
      };

      const result = await cloudinary.uploader.upload(
        base64Data,
        uploadOptions,
      );

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
      };
    } catch {
      throw new Error("Failed to upload base64 to Cloudinary");
    }
  }

  static async deleteFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      return result.result === "ok";
    } catch {
      throw new Error("Failed to delete file from Cloudinary");
    }
  }

  static async deleteFiles(
    publicIds: string[],
  ): Promise<{ deleted: string[]; not_found: string[] }> {
    try {
      const result = await cloudinary.api.delete_resources(publicIds);

      return {
        deleted: Object.keys(result.deleted || {}),
        not_found: result.not_found || [],
      };
    } catch {
      throw new Error("Failed to delete files from Cloudinary");
    }
  }

  static generateUrl(publicId: string, transformations?: any[]): string {
    return cloudinary.url(publicId, {
      transformation: transformations,
      secure: true,
    });
  }

  static generateThumbnailUrl(
    publicId: string,
    width: number = 150,
    height: number = 150,
  ): string {
    return cloudinary.url(publicId, {
      transformation: [
        { width, height, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" },
      ],
      secure: true,
    });
  }
}

export default CloudinaryService;
