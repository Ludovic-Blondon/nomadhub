"use client";

import Image from "next/image";
import { X, Plus } from "lucide-react";

import { ImageItem as ImageItemType } from "./image-types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageItemProps {
  item: ImageItemType;
  onRemove?: (id: string) => void;
  onAddImages?: () => void;
  disabled?: boolean;
}

export function ImageItem({
  item,
  onRemove,
  onAddImages,
  disabled = false,
}: ImageItemProps) {
  // Bouton d'ajout
  if (item.type === "add-button") {
    return (
      <button
        className={cn(
          "relative aspect-square rounded-lg border-2 border-dashed border-default-300",
          "hover:border-default-400 hover:bg-default-50 transition-colors",
          "flex flex-col items-center justify-center gap-2 p-4",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        disabled={disabled}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddImages?.();
        }}
      >
        <Plus className="h-6 w-6 text-default-400" />
        <span className="text-xs text-default-500 text-center">
          Ajouter des images
        </span>
      </button>
    );
  }

  // Image normale
  return (
    <div
      className={cn(
        "relative aspect-square rounded-lg overflow-hidden group",
        "border-2 border-transparent",
        item.isMarkedForDeletion && "opacity-50 grayscale",
      )}
    >
      {/* Image */}
      <Image
        fill
        alt={`Image ${item.order + 1}`}
        className="object-cover"
        src={item.src}
      />

      {/* Overlay avec actions */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
        {/* Actions en haut */}
        <div className="absolute top-2 right-2 z-10">
          {/* Bouton supprimer */}
          {onRemove && (
            <Button
              className={cn(
                "h-6 w-6 p-0 rounded-full bg-red-600 hover:bg-red-700",
                "shadow-md hover:shadow-lg transition-all",
                "border border-white/20 opacity-100",
              )}
              disabled={disabled}
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(item.id);
              }}
            >
              <X className="h-3 w-3 text-white" />
            </Button>
          )}
        </div>

        {/* Indicateur suppression */}
        {item.isMarkedForDeletion && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
              À supprimer
            </div>
          </div>
        )}
      </div>

      {/* Numéro d'ordre */}
      <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {item.order + 1}
      </div>
    </div>
  );
}
