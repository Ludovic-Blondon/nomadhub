export interface ImageItem {
  id: string;
  type: "existing" | "new" | "add-button";
  src: string; // URL cloudinary ou blob URL
  file?: File; // Pour les nouvelles images
  isMarkedForDeletion: boolean;
  order: number;
  originalMediaId?: string; // ID en base pour les images existantes
}

export interface ImageManagerState {
  items: ImageItem[];
  hasChanges: boolean;
  maxImages: number;
  isLoading: boolean;
}

export interface ImageUpdateData {
  imagesToDelete: string[]; // IDs des médias à supprimer
  imagesToUpload: File[]; // Nouveaux fichiers
  imageOrder: Array<{ id: string; order: number }>; // Nouvel ordre
}

export interface ImageManagerActions {
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  reorderImages: (newOrder: ImageItem[]) => void;
  toggleDeletion: (id: string) => void;
}

export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
}
