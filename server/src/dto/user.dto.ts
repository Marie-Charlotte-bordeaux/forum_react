import { z } from 'zod';

export const UserDto = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Le prénom doit comporter au moins 2 caractères' })
    .max(20, { message: 'Le prénom doit comporter au maximum 20 caractères' }),
  
  lastName: z
    .string()
    .min(2, { message: 'Le nom doit comporter au moins 2 caractères' })
    .max(50, { message: 'Le nom doit comporter au maximum 50 caractères' }),
  
  email: z
    .string()
    .email({ message: 'L\'email doit être valide' }),
  
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères' })
});