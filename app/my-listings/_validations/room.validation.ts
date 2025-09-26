import { z } from "zod";

export const createRoomSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  price: z
    .number()
    .min(1, "Le prix doit être supérieur à 0")
    .max(10000, "Le prix ne peut pas dépasser 10000€"),
  city: z
    .string()
    .min(1, "La ville est requise")
    .min(2, "La ville doit contenir au moins 2 caractères")
    .max(100, "La ville ne peut pas dépasser 100 caractères"),
  neighborhood: z
    .string()
    .min(1, "Le quartier est requis")
    .min(2, "Le quartier doit contenir au moins 2 caractères")
    .max(100, "Le quartier ne peut pas dépasser 100 caractères"),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
