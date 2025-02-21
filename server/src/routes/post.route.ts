import express from 'express';
import { CreatePost, GetAllPosts, GetPostById, GetPostsUser, EditePost } from '../controllers/postController';

const postRouter = express.Router();

// *******************************
// POSTS forum
// *******************************
// ok Create un post
postRouter.post('/createPost', CreatePost);

// ok Get by-id Afficher un post
postRouter.get('/post/:id', GetPostById);

// ok Get all Afficher post d'un user 
postRouter.get('/post/:userId/posts', GetPostsUser);

// ok Get all Afficher plsr post 
postRouter.get('/posts', GetAllPosts);


//Modifier un post
postRouter.put('/post/:id', EditePost);

//Delete un post


export default postRouter;
