import { Request, Response } from 'express';

import Post, { PostSchema } from "../schemas/post.schema"
import { IPost } from "../models/post"
import { PostService } from "../services/post.service"
import { PostDto } from '../dto/post.dto';
import { UserService } from '../services/user.service';
import { loginUser } from './userController';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT } from '../libs/jwt';


// Faire un fichier ERROR avec toutes les erreurs 
export const ERRORS = {
  USER_EXIST :"USER_EXIST",
  USER_DOESNT_EXIST :"USER_DOESNT_EXIST"
}


// *******************************
// Créer un post
// *******************************
export async function CreatePost(req: Request, res: Response): Promise<void> {
  try { 
      //  Récupérer le token depuis les cookies
      const token = req.cookies.access_token;
      if (!token) {
        console.log('token! if', token)
          res.status(401).json({ message: "Utilisateur non authentifié" });
          return;
      }
      console.log('token! else', token)

      //  Vérifier le JWT et extraire l'ID utilisateur
      const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as unknown as {
        payload: any; user_Id: string 
};
      const user_Id = decoded.payload.data.id;

      console.log('decoded', decoded, 'user_Id', user_Id)
      //  Valider les données du body
      const validation = PostDto.safeParse({ ...req.body, user_Id });

      console.log('validation', validation)

      if (!validation.success) {
          res.status(400).json({ message: "Erreur de validation", errors: validation.error.errors });
          return;
      }

      //  recupere l'id que l'utilisateur existe
      const idFromDb = await UserService.findById(user_Id);
      console.log("idFromDb !!!!", idFromDb)
      console.log("user_Id :::", user_Id)
      
      if (idFromDb ) {
        console.log("idFromDb...")
        if( idFromDb._id.toString() !== user_Id){
          console.log("idFromDb... idFromDb._id", idFromDb._id, "user_Id", user_Id,  idFromDb._id !== user_Id)

          res.status(400).json({ message: ERRORS.USER_DOESNT_EXIST });
          return;
        }
      

      //  Créer le post
      const { title, content } = validation.data;
      const createdPost = await PostService.create({ title, content, user_Id });

      //  Retourner la réponse
      res.status(201).json({
          message: "POST_CREATED",
          post: {
              title: createdPost.title,
              content: createdPost.content,
              user_Id: user_Id,
          }
      });
  }} catch (error) {
      res.status(500).json({ message: "DATABASE_ERROR", error });
  }
}

// *******************************
// lectur un post
// *******************************
export const GetPostById = async (req: Request, res: Response): Promise<void> =>{

}

// *******************************
// lecture all posts
// *******************************
export const GetPosts = async (req: Request, res: Response): Promise<void> =>{

}

// *******************************
// lecture all posts
// *******************************
export const GetAllPosts = async (req: Request, res: Response): Promise<void> =>{

}

// *******************************
// modifier un post
// *******************************
export const EditePost = async (req: Request, res: Response): Promise<void> =>{

}




// *******************************
// supprimer un post
// *******************************
export const DeletePost = async (req: Request, res: Response): Promise<void> =>{

}