import { z } from "zod";


export const GetCommentDto = z.object({
  userFirstName: 
    z.string(),

  userLastName: 
    z.string(),

  content: 
    z.string().min(1, 
    { message: "Le commentaire ne peut pas être vide" }),

  created_at: 
    z.string().default(() => new Date().toISOString()),
})