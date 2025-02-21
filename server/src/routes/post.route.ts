import express from 'express';
import { CreatePost, GetAllPosts, GetPostById, GetPostsUser, EditePost } from '../controllers/postController';

const postRouter = express.Router();

// *******************************
// POSTS forum
// *******************************
// ok Create un post
postRouter.post('/createPost', CreatePost);

// ok Get by-id lire un post
postRouter.get('/post/:id', GetPostById);

// ok Get all lire  post d'un user ok
postRouter.get('/post/:userId/posts', GetPostsUser);

// ok Get all lire plsr post 
postRouter.get('/posts', GetAllPosts);


//Modifier un post
postRouter.put('/post/:id', EditePost);

//Delete un post


export default postRouter;
