"use client";

import { ImageItem } from "./image-item";
import { ImageItem as ImageItemType, ImageManagerActions } from "./image-types";

import { cn } from "@/lib/utils";

interface ImageGridProps {
  items: ImageItemType[];
  actions: ImageManagerActions;
  disabled?: boolean;
  onAddImages?: () => void;
}

export function ImageGrid({
  items,
  actions,
  disabled = false,
  onAddImages,
}: ImageGridProps) {
  const handleRemoveImage = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (item?.type === "existing") {
      // Pour les images existantes, marquer pour suppression
      actions.toggleDeletion(id);
    } else {
      // Pour les nouvelles images, supprimer immédiatement
      actions.removeImage(id);
    }
  };

  // Séparer les images par type pour l'affichage
  const imageItems = items.filter((item) => item.type !== "add-button");
  const addButtonItem = items.find((item) => item.type === "add-button");

  return (
    <div className="space-y-4">
      {/* Grid principal des images */}
      {imageItems.length > 0 && (
        <div
          className={cn(
            "grid gap-4",
            imageItems.length === 1 && "grid-cols-1 max-w-md",
            imageItems.length === 2 && "grid-cols-2",
            imageItems.length >= 3 &&
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {imageItems.map((item) => (
            <ImageItem
              key={item.id}
              disabled={disabled}
              item={item}
              onRemove={handleRemoveImage}
            />
          ))}
        </div>
      )}

      {/* Bouton d'ajout */}
      {addButtonItem && (
        <div className="flex justify-center">
          <div className="w-48">
            <ImageItem
              disabled={disabled}
              item={addButtonItem}
              onAddImages={onAddImages}
            />
          </div>
        </div>
      )}

      {/* Message si aucune image */}
      {imageItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-default-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-default-400 text-xl">📷</span>
          </div>
          <p className="text-default-500 mb-4">
            Aucune image pour cette annonce
          </p>
          {addButtonItem && (
            <div className="flex justify-center">
              <div className="w-48">
                <ImageItem
                  disabled={disabled}
                  item={addButtonItem}
                  onAddImages={onAddImages}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Informations sur les changements */}
      {imageItems.some((item) => item.isMarkedForDeletion) && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-800 text-sm">
            {imageItems.filter((item) => item.isMarkedForDeletion).length}{" "}
            image(s) seront supprimées lors de la sauvegarde.
          </p>
        </div>
      )}

      {imageItems.some((item) => item.type === "new") && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            {imageItems.filter((item) => item.type === "new").length}{" "}
            nouvelle(s) image(s) seront ajoutées lors de la sauvegarde.
          </p>
        </div>
      )}
    </div>
  );
}
