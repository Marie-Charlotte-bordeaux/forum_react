import express from 'express';
import { CreatePost } from '../controllers/postController';

const postRouter = express.Router();

// *******************************
// POSTS forum
// *******************************
//Create un post
postRouter.post('/post', CreatePost);

//Get all / by-id lire un post

//Modifier un post

//Delete un post


export default postRouter;
