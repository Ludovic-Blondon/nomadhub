"use client";

import { useState } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { toast } from "sonner";

import { uploadAvatar, removeAvatar } from "./avatar-actions";

import { authClient } from "@/lib/auth-client";

interface AvatarSectionProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AvatarSection({ user }: AvatarSectionProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isRemovingAvatar, setIsRemovingAvatar] = useState(false);
  const { refetch } = authClient.useSession();

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();

      formData.append("avatar", file);

      await uploadAvatar(formData);

      // Rafraîchir la session pour récupérer la nouvelle image
      await refetch();

      toast.success("Avatar mis à jour avec succès");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour de l'avatar",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setIsRemovingAvatar(true);
    try {
      await removeAvatar();

      // Rafraîchir la session pour récupérer la nouvelle image
      await refetch();

      toast.success("Avatar supprimé avec succès");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de l'avatar",
      );
    } finally {
      setIsRemovingAvatar(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar
          className="w-32 h-32 text-large"
          name={user.name || user.email || "User"}
          src={user.image || undefined}
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {user.name || "Utilisateur"}
          </h3>
          <p className="text-default-500">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-2">
          <input
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            type="file"
            onChange={handleAvatarUpload}
          />
          <label htmlFor="avatar-upload">
            <Button
              as="span"
              className="cursor-pointer"
              color="primary"
              isLoading={isUploadingAvatar}
              variant="flat"
            >
              Changer l'avatar
            </Button>
          </label>
          <Button
            color="danger"
            isLoading={isRemovingAvatar}
            variant="flat"
            onClick={handleRemoveAvatar}
          >
            Supprimer l'avatar
          </Button>
        </div>
        <p className="text-small text-default-500 text-center">
          Formats acceptés : JPG, PNG, GIF. Taille maximale : 2MB.
        </p>
      </div>
    </div>
  );
}
