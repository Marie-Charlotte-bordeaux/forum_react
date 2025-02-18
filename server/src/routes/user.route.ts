import express from 'express';
import { createUser, loginUser } from '../controllers/userController';

const userRouter = express.Router();

//Créer un utilisateur 
userRouter.post('/register', createUser);

// pour la connexion d'un utilisateur
userRouter.post('/login', loginUser);

export default userRouter;
