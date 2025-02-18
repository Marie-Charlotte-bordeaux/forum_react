// import  express  from "express";
// import  UserSchema from "../schema/user.schema";
// import multer from "multer";
// import path from "path";

// export const UserController = express.Router();

// UserController.post('/register', async (req, rep) => {

// })

// controllers/userController.ts
import { Request, Response } from 'express';
import { UserSchema } from '../schemas/user.schema';
import bcrypt from 'bcryptjs';
import { AvatarSchema } from '../schemas/avatar.schema';
import { IUser } from '../models/user';

// Créer un utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    const { lastName, firstName, email, password, avatar: AvatarSchema, created_at,
      updated_at,
      isDeleted,
      deleted_at } = req.body;
    
    // Créer un nouvel utilisateur
    const user: IUser = new User ({
      lastName,
      firstName,
      email,
      password,
      avatar: AvatarSchema,
      created_at,
      updated_at,
      isDeleted,
      deleted_at
    });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }


    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

// Connexion de l'utilisateur
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Si tout va bien, retourner une réponse
    res.status(200).json({ message: 'Connexion réussie', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};
