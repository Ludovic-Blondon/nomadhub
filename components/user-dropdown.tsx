"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const router = useRouter();

  const handleAction = (key: string) => {
    switch (key) {
      case "reservations":
        router.push("/booking");
        break;
      case "add-room":
        router.push("/room/add");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
        break;
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user.name || user.email || "User"}
          size="sm"
          src={user.image || undefined}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Menu utilisateur"
        onAction={(key) => handleAction(String(key))}
      >
        <DropdownItem key="reservations">Mes réservations</DropdownItem>
        <DropdownItem key="add-room">Ajouter une chambre</DropdownItem>
        <DropdownItem key="profile">Mon profil</DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger">
          Déconnexion
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
