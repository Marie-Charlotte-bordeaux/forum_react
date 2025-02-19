import { Request, Response } from 'express';
import User from '../schemas/user.schema';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/user';
import * as userService from '../services/user.service'
import { Hasher } from '../libs/hash';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import {JWT} from '../libs/jwt'; 

// Créer un utilisateur
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    // Valider les données d'entrée avec Zod
    const validation = UserDto.safeParse(req.body);

    // Si la validation échoue, renvoyer les erreurs
    if (!validation.success) {
      res.status(400).json({ message: 'Erreur de validation', errors: validation.error.errors });
      return;
    }

    // Si la validation réussit, on peut créer l'utilisateur
    const { lastName, firstName, email, password } = validation.data;

    // Créer un nouvel utilisateur
    const user: IUser = new User({
      lastName,
      firstName,
      email,
      password,
    });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserService.findUserByEmail(email, user._id);
    if (existingUser) {
      res.status(400).json({ message: ERRORS.USER_EXIST });
      return;
    }

    // Hachage du mot de passe
    const hashedPassword = await Hasher.hash(password)

    const createdUser = await UserService.create({lastName, firstName, email, password: hashedPassword});
    // Générer un token JWT
  // Créer un jwt
  const access_token = JWT.sign({ id: existingUser });

    // On ne retourne pas le mot de passe de l'utilisateur
    const userResponse = {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
    };

    res.status(201).json({ message: 'USER_CREATED', user:userResponse,
      token: access_token});
  } catch (error) {
    res.status(500).json({ message: 'DATABASE_ERROR', error });
  }

};

export const ERRORS = {
  USER_EXIST :"USER_EXIST"
}


// Connexion de l'utilisateur
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Utilisateur non trouvé' });
      return
    }

    // Vérifier le mot de passe

    // Si tout va bien, retourner une réponse
    // Créer un JWT (Token)
    // Mettre le token dans les cookies
    res.status(200).json({ message: 'Connexion réussie', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};

function create(arg0: { lastName: any; firstName: any; email: any; password: string; }) {
  throw new Error('Function not implemented.');
}

