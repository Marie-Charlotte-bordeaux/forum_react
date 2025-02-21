import Post from "../schemas/post.schema";

export const PostService ={


  create: async (postData: any) =>{
    const newPost = new Post(postData);
    const savedPost = await newPost.save();
    return savedPost;
  }
} 