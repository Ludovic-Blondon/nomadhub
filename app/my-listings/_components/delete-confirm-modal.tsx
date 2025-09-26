"use client";

import { useState, useTransition } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { handleDeleteRoom } from "../_actions/delete-room.action";

import { RoomWithRelations } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomWithRelations;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  room,
}: DeleteConfirmModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await handleDeleteRoom(room.id);

        if (result.ok) {
          toast.success("Chambre supprimée avec succès");
          onClose();
        } else {
          setError(result.message);
        }
      } catch {
        setError("Erreur inattendue lors de la suppression");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Supprimer la chambre
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer la chambre "{room.title}" ? Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-default-50 p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-1">{room.title}</h4>
          <p className="text-xs text-default-500">
            {room.city}, {room.neighborhood} • {room.price}€/nuit
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button disabled={isPending} variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
