"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
}

interface PersonalInfoFormProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const nameParts = user.name?.split(" ") || ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>();

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

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmitPersonalInfo)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          isRequired
          defaultValue={firstName}
          label="Prénom"
          placeholder="Votre prénom"
          {...register("firstName", {
            required: "Le prénom est requis",
          })}
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}
        />
        <Input
          isRequired
          defaultValue={lastName}
          label="Nom"
          placeholder="Votre nom"
          {...register("lastName", {
            required: "Le nom est requis",
          })}
          errorMessage={errors.lastName?.message}
          isInvalid={!!errors.lastName}
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
  );
}
