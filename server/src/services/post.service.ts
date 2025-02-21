import Post from "../schemas/post.schema";

export const PostService ={

  findById: async (_id: string) => {
    try {
        const post = await Post.findOne({ _id });
        return post;
      } catch (error) {
        throw new Error('Erreur lors de la recherche du POST_id');
      }
  },

  getAll: async () => {
    try {
      const posts = await Post.find();
      return posts;
      } catch (error) {
        throw new Error('Erreur lors de la recherche des POSTs');
      }
  },

  create: async (postData: any) =>{
    const newPost = new Post(postData);
    const savedPost = await newPost.save();
    return savedPost;
  }


} 