"use client";

import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import Image from "next/image";

import {
  MAX_IMAGES_PER_ROOM,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "./upload.constants";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MAX_IMAGES = MAX_IMAGES_PER_ROOM;
const ALLOWED_TYPES = ALLOWED_IMAGE_TYPES;
const FILE_SIZE_LIMIT = MAX_FILE_SIZE;

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  error?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export function ImageUpload({ onImagesChange, error }: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      setUploadError("");
      const validFiles: ImageFile[] = [];
      const remainingSlots = MAX_IMAGES - images.length;
      const rejectedFiles: string[] = [];

      Array.from(files)
        .slice(0, remainingSlots)
        .forEach((file) => {
          if (!ALLOWED_TYPES.includes(file.type as any)) {
            rejectedFiles.push(`${file.name}: type non supporté`);

            return;
          }

          if (file.size > FILE_SIZE_LIMIT) {
            rejectedFiles.push(
              `${file.name}: trop volumineux (${formatFileSize(file.size)} > 2MB)`,
            );

            return;
          }

          const imageFile: ImageFile = {
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7),
          };

          validFiles.push(imageFile);
        });

      if (rejectedFiles.length > 0) {
        setUploadError(rejectedFiles.join(", "));
      }

      if (validFiles.length > 0) {
        const newImages = [...images, ...validFiles];

        setImages(newImages);
        onImagesChange(newImages.map((img) => img.file));
      }
    },
    [images, onImagesChange],
  );

  const removeImage = useCallback(
    (id: string) => {
      const newImages = images.filter((img) => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview);

          return false;
        }

        return true;
      });

      setImages(newImages);
      onImagesChange(newImages.map((img) => img.file));
    },
    [images, onImagesChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Label>
          Images ({images.length}/{MAX_IMAGES})
        </Label>

        {/* Zone de drop */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
            ${images.length >= MAX_IMAGES ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary"}
          `}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            multiple
            accept={ALLOWED_TYPES.join(",")}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            disabled={images.length >= MAX_IMAGES}
            type="file"
            onChange={(e) => handleFileSelect(e.target.files)}
          />

          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">Cliquez pour ajouter</span> ou
              glissez-déposez
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, WEBP jusqu'à 2MB (max {MAX_IMAGES} images)
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {uploadError && (
          <p className="text-sm text-destructive">{uploadError}</p>
        )}
      </div>

      {/* Preview des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  fill
                  alt="Preview"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  src={image.preview}
                />
              </div>
              <Button
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                size="sm"
                type="button"
                variant="destructive"
                onClick={() => removeImage(image.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs p-1 rounded text-center truncate">
                {image.file.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Aucune image sélectionnée</p>
        </div>
      )}
    </div>
  );
}
