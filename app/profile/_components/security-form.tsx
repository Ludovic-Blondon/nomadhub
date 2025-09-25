"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SecurityForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordForm>();

  const newPassword = watch("newPassword");

  const onSubmitPassword = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");

      return;
    }

    setIsLoading(true);
    try {
      await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Mot de passe mis à jour avec succès");
      reset();
    } catch {
      toast.error("Erreur lors du changement de mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmitPassword)}>
      <Input
        isRequired
        label="Mot de passe actuel"
        placeholder="Votre mot de passe actuel"
        type="password"
        {...register("currentPassword", {
          required: "Le mot de passe actuel est requis",
        })}
        errorMessage={errors.currentPassword?.message}
        isInvalid={!!errors.currentPassword}
      />
      <Input
        isRequired
        label="Nouveau mot de passe"
        placeholder="Votre nouveau mot de passe"
        type="password"
        {...register("newPassword", {
          required: "Le nouveau mot de passe est requis",
          minLength: {
            value: 8,
            message: "Le mot de passe doit contenir au moins 8 caractères",
          },
        })}
        errorMessage={errors.newPassword?.message}
        isInvalid={!!errors.newPassword}
      />
      <Input
        isRequired
        label="Confirmer le nouveau mot de passe"
        placeholder="Confirmez votre nouveau mot de passe"
        type="password"
        {...register("confirmPassword", {
          required: "La confirmation est requise",
          validate: (value) =>
            value === newPassword || "Les mots de passe ne correspondent pas",
        })}
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
      />
      <Button
        className="w-full md:w-auto"
        color="primary"
        isLoading={isLoading}
        type="submit"
      >
        Changer le mot de passe
      </Button>
    </form>
  );
}
