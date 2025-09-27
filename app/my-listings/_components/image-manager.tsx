"use client";

import { useState, useEffect, useRef } from "react";

import { ImageGrid } from "./image-grid";
import {
  ImageItem,
  ImageManagerState,
  ImageManagerActions,
  ImageUpdateData,
} from "./image-types";

import { RoomWithRelations } from "@/types";

interface ImageManagerProps {
  room: RoomWithRelations;
  onImageDataChange?: (data: ImageUpdateData) => void;
  maxImages?: number;
  disabled?: boolean;
}

export function ImageManager({
  room,
  onImageDataChange,
  maxImages = 10,
  disabled = false,
}: ImageManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<ImageManagerState>({
    items: [],
    hasChanges: false,
    maxImages,
    isLoading: false,
  });

  // Cleanup des blob URLs au démontage du composant
  useEffect(() => {
    return () => {
      // Nettoyer toutes les blob URLs lors du démontage
      state.items
        .filter((item) => item.type === "new" && item.src.startsWith("blob:"))
        .forEach((item) => URL.revokeObjectURL(item.src));
    };
  }, []);

  // Initialiser les images existantes
  useEffect(() => {
    const existingImages: ImageItem[] = (room.medias || []).map(
      (media, index) => ({
        id: media.id,
        type: "existing" as const,
        src: media.path,
        isMarkedForDeletion: false,
        order: index,
        originalMediaId: media.id,
      }),
    );

    // Ajouter le bouton d'ajout si on n'a pas atteint la limite
    const items = [...existingImages];

    if (existingImages.length < maxImages) {
      items.push({
        id: "add-button",
        type: "add-button" as const,
        src: "",
        isMarkedForDeletion: false,
        order: existingImages.length,
      });
    }

    setState((prev) => ({ ...prev, items }));
  }, [room.medias, maxImages]);

  // Notifier les changements au parent
  useEffect(() => {
    if (!onImageDataChange) return;

    const activeItems = state.items.filter(
      (item) => item.type !== "add-button",
    );
    const imagesToDelete = activeItems
      .filter((item) => item.type === "existing" && item.isMarkedForDeletion)
      .map((item) => item.originalMediaId!)
      .filter(Boolean);

    const imagesToUpload = activeItems
      .filter((item) => item.type === "new" && item.file)
      .map((item) => item.file!);

    const imageOrder = activeItems
      .filter((item) => !item.isMarkedForDeletion)
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({
        id: item.originalMediaId || item.id,
        order: index,
      }));

    onImageDataChange({
      imagesToDelete,
      imagesToUpload,
      imageOrder,
    });
  }, [state.items, onImageDataChange]);

  const actions: ImageManagerActions = {
    addImages: (files: File[]) => {
      const currentImages = state.items.filter(
        (item) => item.type !== "add-button",
      );
      const availableSlots = maxImages - currentImages.length;
      const filesToAdd = files.slice(0, availableSlots);

      const newImages: ImageItem[] = filesToAdd.map((file, index) => {
        const url = URL.createObjectURL(file);

        return {
          id: `new-${Date.now()}-${index}`,
          type: "new" as const,
          src: url,
          file,
          isMarkedForDeletion: false,
          order: currentImages.length + index,
        };
      });

      setState((prev) => {
        const withoutAddButton = prev.items.filter(
          (item) => item.type !== "add-button",
        );
        const updatedItems = [...withoutAddButton, ...newImages];

        // Remettre le bouton d'ajout si on n'a pas atteint la limite
        if (updatedItems.length < maxImages) {
          updatedItems.push({
            id: "add-button",
            type: "add-button" as const,
            src: "",
            isMarkedForDeletion: false,
            order: updatedItems.length,
          });
        }

        return {
          ...prev,
          items: updatedItems,
          hasChanges: true,
        };
      });
    },

    removeImage: (id: string) => {
      setState((prev) => {
        const updatedItems = prev.items.filter((item) => item.id !== id);

        // Nettoyer l'URL blob pour les nouvelles images
        const removedItem = prev.items.find((item) => item.id === id);

        if (
          removedItem?.type === "new" &&
          removedItem.src.startsWith("blob:")
        ) {
          URL.revokeObjectURL(removedItem.src);
        }

        // Réorganiser l'ordre
        const reorderedItems = updatedItems
          .filter((item) => item.type !== "add-button")
          .map((item, index) => ({ ...item, order: index }));

        // Remettre le bouton d'ajout
        if (reorderedItems.length < maxImages) {
          reorderedItems.push({
            id: "add-button",
            type: "add-button" as const,
            src: "",
            isMarkedForDeletion: false,
            order: reorderedItems.length,
          });
        }

        return {
          ...prev,
          items: reorderedItems,
          hasChanges: true,
        };
      });
    },

    toggleDeletion: (id: string) => {
      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) => {
          if (item.id === id) {
            const newItem = {
              ...item,
              isMarkedForDeletion: !item.isMarkedForDeletion,
            };

            return newItem;
          }

          return item;
        }),
        hasChanges: true,
      }));
    },

    reorderImages: (newOrder: ImageItem[]) => {
      const reorderedItems = newOrder.map((item, index) => ({
        ...item,
        order: index,
      }));

      // Remettre le bouton d'ajout
      const addButton = state.items.find((item) => item.type === "add-button");

      if (addButton && reorderedItems.length < maxImages) {
        reorderedItems.push({
          ...addButton,
          order: reorderedItems.length,
        });
      }

      setState((prev) => ({
        ...prev,
        items: reorderedItems,
        hasChanges: true,
      }));
    },
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      actions.addImages(files);
    }
    // Reset l'input pour permettre de sélectionner les mêmes fichiers
    e.target.value = "";
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileInputChange}
      />

      <ImageGrid
        actions={actions}
        disabled={disabled || state.isLoading}
        items={state.items}
        onAddImages={openFileDialog}
      />

      {state.hasChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            💡 Vos modifications seront appliquées lors de la sauvegarde du
            formulaire.
          </p>
        </div>
      )}
    </div>
  );
}
