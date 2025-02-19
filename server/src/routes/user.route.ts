import express from 'express';
import { createUser, loginUser, logout } from '../controllers/userController';

const userRouter = express.Router();

//Créer un utilisateur 
userRouter.post('/register', createUser);

// pour la connexion d'un utilisateur
userRouter.post('/login', loginUser);

// Deco
userRouter.get('/logout', logout);

export default userRouter;
