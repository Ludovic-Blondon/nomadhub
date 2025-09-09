import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Email invalide" }),
  password: z
    .string()
    .min(1, "Mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const signUpSchema = z
  .object({
    firstname: z
      .string()
      .min(1, "Prénom est requis")
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
    lastname: z
      .string()
      .min(1, "Nom est requis")
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    email: z.email({ message: "Email invalide" }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre",
      ),
    confirmPassword: z.string().min(1, "Confirmation du mot de passe requise"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
