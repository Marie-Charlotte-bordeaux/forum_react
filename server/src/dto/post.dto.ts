import { z } from "zod";

export const PostDto = z.object({
  title: z
    .string()
    .min(5, { message: "Le titre doit contenir au moins 5 caractères" })
    .max(100, { message: "Le titre ne peut pas dépasser 100 caractères" }),

  content: z
    .string()
    .min(2, { message: "Votre contenu ne peut pas être vide" })
    .max(500, { message: "Le contenu du post ne peut excéder 500 caractères" }),

  user_Id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "ID utilisateur invalide" }), // Vérifie que c'est un ObjectId MongoDB

  created_at: z.string().default(() => new Date().toISOString()), // Stocké en ISO string
  updated_at: z.string().optional(), // Stocké en ISO string aussi
});
