import { z } from "zod";
import { GetCommentDto } from "./comment.dto";

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
    
});

export const GetPostDto = z.object({
  title: z
    .string(),

  content: z
    .string(),

  firstName: z
    .string(),

  lastName : z
    .string(),

  likes: 
  z.array(z.string()),

  comments: z.array(
    GetCommentDto
  ), // Tableau d'objets représentant les commentaires

  updated_at: 
    z.string().default(() => new Date().toISOString()),

    
})
