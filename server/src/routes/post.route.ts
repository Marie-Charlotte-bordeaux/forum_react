import express from 'express';
import { CreatePost, GetAllPosts, GetPostById, GetPosts } from '../controllers/postController';

const postRouter = express.Router();

// *******************************
// POSTS forum
// *******************************
//Create un post
postRouter.post('/createPost', CreatePost);

//Get all / by-id lire un post
postRouter.get('/post/:_id', GetPostById);

//Get all lire  post d'un user
postRouter.get('/post/user/:_id', GetPosts);

//Get all lire  post 
postRouter.get('/posts', GetAllPosts);

//Modifier un post

//Delete un post


export default postRouter;
