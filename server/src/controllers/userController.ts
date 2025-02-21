import { Request, Response } from 'express';
import User from '../schemas/user.schema';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';
import { IUserLogin } from '../models/userLogin';  // Importation de l'interface IUserLogin
import { UserDto } from '../dto/user.dto';
import { Hasher } from '../libs/hash';
import {JWT} from '../libs/jwt'; 


// *******************************
// Créer un utilisateur
// *******************************
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
    const existingUser = await UserService.findUserByEmail(email);
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
  res.cookie("access_token", access_token, { httpOnly: true, sameSite: "strict", secure: false })
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

// Faire un fichier ERROR avec toutes les erreurs 
export const ERRORS = {
  USER_EXIST :"USER_EXIST"
}


// *******************************
// Connexion de l'utilisateur
// *******************************
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUserLogin = req.body; 

  // Récuperer l'utilisateur depuis la BDD
  const userFromDB = await  UserService.findUserByEmail(email);
  // Tester si il existe, sinon erreur
  console.log(userFromDB)
  if (!userFromDB) {
    res.status(401).json({ message: "INVALID_CREDENTIAL" });
    return;
  }
  // Tester si le MDP est correct
  const isPasswordValid = Hasher.compare(password, userFromDB.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "INVALID_CREDENTIAL" });
    return;
  }

  // Créer un jwt
  const access_token = JWT.sign({ id: userFromDB._id });
  // Ajouter le token dans les cookies
  res.cookie("access_token", access_token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
  const user = {
    _id: userFromDB._id,
    email: userFromDB.email,
    avatarURL: userFromDB.avatar
  }
  // retourner le access_token, et les données de l'utilisateur
  res.status(200).json({ message: "SINGIN_SUCCESSFUL", access_token: access_token, user })
  return;
};

// ********************
// Récupérer l'utilisateur connecté
// ********************
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
        // Si pas d'utilisateur authentifié, retourner une erreur
        res.status(401).json({ message: "Non authentifié" });
        return;
    }

    // Si l'utilisateur est authentifié, retourner ses données
    const user = req.user;
    // Renvoie une réponse avec les informations de l'utilisateur
    res.json({
      _id: user._id,
      email: user.email,
      avatarURL: user.avatarURL,  
      fisrtName: user.fisrtName   
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    // En cas d'erreur serveur, retourner un message d'erreur
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'utilisateur." });
  }
};
// *******************************
// Déconnexion de l'utilisateur
// *******************************
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 🔹 Secure en prod
    sameSite: "strict",
    path: "/" 
  });

  res.status(200).json({ message: "LOGOUT_SUCCESSFUL" });
  return;
};
