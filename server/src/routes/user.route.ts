import express from 'express';
import { createUser, loginUser, logout, getMe } from '../controllers/userController';

const userRouter = express.Router();
// *******************************
// USER
// *******************************
//Créer un utilisateur 
userRouter.post('/register', createUser);

// pour la connexion d'un utilisateur
userRouter.post('/login', loginUser);
userRouter.get('/me', getMe);
// Deco
userRouter.post('/logout', logout);




export default userRouter;
