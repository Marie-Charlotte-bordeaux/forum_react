import express from 'express';
import { CreatePost, GetAllPosts, GetPostById, GetPostsUser, EditePost } from '../controllers/postController';

const postRouter = express.Router();

// *******************************
// POSTS forum
// *******************************
//Create un post
postRouter.post('/createPost', CreatePost);

//Modifier un post
postRouter.put('/post/:id', EditePost);

//Get by-id lire un post
postRouter.get('/post/:id', GetPostById);

//Get all lire  post d'un user
postRouter.get('/post/:userId/posts', GetPostsUser);

//Get all lire plsr post 
postRouter.get('/posts', GetAllPosts);

//Delete un post


export default postRouter;
