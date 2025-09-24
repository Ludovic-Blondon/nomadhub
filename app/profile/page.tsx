"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isRemovingAvatar, setIsRemovingAvatar] = useState(false);

  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal },
  } = useForm<PersonalInfoForm>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    watch,
    reset: resetPassword,
  } = useForm<PasswordForm>();

  const newPassword = watch("newPassword");

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Vous devez être connecté pour accéder à cette page.</div>
      </div>
    );
  }

  const user = session.user;
  const nameParts = user.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const onSubmitPersonalInfo = async (data: PersonalInfoForm) => {
    setIsLoading(true);
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();

      await authClient.updateUser({
        name: fullName,
      });

      toast.success("Informations mises à jour avec succès");
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

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
      resetPassword();
    } catch {
      toast.error("Erreur lors du changement de mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();

      formData.append("avatar", file);

      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'upload");
      }

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
      const response = await fetch("/api/upload/avatar", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

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
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <p className="text-default-500 mt-2">
          Gérez vos informations personnelles et vos paramètres de compte
        </p>
      </div>

      <Card>
        <CardBody>
          <Tabs aria-label="Options du profil" className="w-full">
            <Tab key="personal" title="Informations personnelles">
              <form
                className="space-y-6"
                onSubmit={handleSubmitPersonal(onSubmitPersonalInfo)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    isRequired
                    defaultValue={firstName}
                    label="Prénom"
                    placeholder="Votre prénom"
                    {...registerPersonal("firstName", {
                      required: "Le prénom est requis",
                    })}
                    errorMessage={errorsPersonal.firstName?.message}
                    isInvalid={!!errorsPersonal.firstName}
                  />
                  <Input
                    isRequired
                    defaultValue={lastName}
                    label="Nom"
                    placeholder="Votre nom"
                    {...registerPersonal("lastName", {
                      required: "Le nom est requis",
                    })}
                    errorMessage={errorsPersonal.lastName?.message}
                    isInvalid={!!errorsPersonal.lastName}
                  />
                </div>
                <Input
                  isReadOnly
                  defaultValue={user.email || ""}
                  description="L'email ne peut pas être modifié pour le moment"
                  label="Email"
                  placeholder="votre@email.com"
                  type="email"
                />
                <Button
                  className="w-full md:w-auto"
                  color="primary"
                  isLoading={isLoading}
                  type="submit"
                >
                  Sauvegarder les modifications
                </Button>
              </form>
            </Tab>

            <Tab key="security" title="Sécurité">
              <form
                className="space-y-6"
                onSubmit={handleSubmitPassword(onSubmitPassword)}
              >
                <Input
                  isRequired
                  label="Mot de passe actuel"
                  placeholder="Votre mot de passe actuel"
                  type="password"
                  {...registerPassword("currentPassword", {
                    required: "Le mot de passe actuel est requis",
                  })}
                  errorMessage={errorsPassword.currentPassword?.message}
                  isInvalid={!!errorsPassword.currentPassword}
                />
                <Input
                  isRequired
                  label="Nouveau mot de passe"
                  placeholder="Votre nouveau mot de passe"
                  type="password"
                  {...registerPassword("newPassword", {
                    required: "Le nouveau mot de passe est requis",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit contenir au moins 8 caractères",
                    },
                  })}
                  errorMessage={errorsPassword.newPassword?.message}
                  isInvalid={!!errorsPassword.newPassword}
                />
                <Input
                  isRequired
                  label="Confirmer le nouveau mot de passe"
                  placeholder="Confirmez votre nouveau mot de passe"
                  type="password"
                  {...registerPassword("confirmPassword", {
                    required: "La confirmation est requise",
                    validate: (value) =>
                      value === newPassword ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  errorMessage={errorsPassword.confirmPassword?.message}
                  isInvalid={!!errorsPassword.confirmPassword}
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
            </Tab>

            <Tab key="avatar" title="Avatar">
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
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
