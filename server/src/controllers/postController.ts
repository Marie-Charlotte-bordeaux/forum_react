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
      const validation = PostDto.safeParse(req.body)

      if(!validation.success){
        res.status(400).json({ message: 'Erreur de validation', errors: validation.error.errors });
        return;
      }
      // Si la validation réussit, on peut créer le post (si user est ok)
      const { title, content, user_Id, created_at, updated_at } = validation.data;
      // Créer un nouvel post
      const post: IPost = new Post ({
        title,
        content,
        user_Id,
        created_at,
        updated_at
      });

    //Vérifié si user = true et si login
    const existingUser = await UserService.findById(user_Id);
        if (!existingUser) {
          res.status(400).json({ message: ERRORS.USER_DOESNT_EXIST });
          return;
        }
        const loginUser = await JWT.verify("access_token") 
        if(!loginUser) {
          res.status(400).json({ message: ERRORS.USER_DOESNT_EXIST });
          return;
        }
        const createdPost = await PostService.create({title, content, user_Id, created_at, updated_at});

        //dto use ici pour renvoyer le bon format
        const postResponse = {
          title: createdPost.title,
          content: createdPost.content,
          user_Id: createdPost.user_Id,
          created_at: createdPost.created_at,
          updated_at: createdPost.updated_at
        };

        res.status(200).json({ message: 'POST_CREATED', post: postResponse});
        // ***
      }
    catch(error) {
      res.status(500).json({ message: 'DATABASE_ERROR', error });
    }


  };




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