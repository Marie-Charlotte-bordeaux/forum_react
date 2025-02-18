import { Request, Response } from 'express';
import User  from '../schemas/user.schema';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/user';
import * as userService from '../services/user.service' 
import { DefaultNamingStrategy } from 'typeorm';

// Créer un utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    const { 
      lastName, 
      firstName, 
      email, 
      password, 
      avatar: AvatarSchema, 
      created_at,
      updated_at,
      isDeleted,
      deleted_at } = req.body;

    // Hacher le mot de passe avant de le sauvegarder
    const salt = await bcrypt.genSalt(10); // Générer un sel pour le hachage
    const hashedPassword = await bcrypt.hash(password, salt); // Hacher le mot de passe
    
    // Créer un nouvel utilisateur
    const user: IUser = new User ({
      lastName,
      firstName,
      email,
      password: hashedPassword,
      avatar: AvatarSchema,
      created_at,
      updated_at,
      isDeleted,
      deleted_at
    });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userService.findUserByEmail(email);
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
