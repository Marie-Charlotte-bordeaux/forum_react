import Post from "../schemas/post.schema";

export const PostService ={

  findById: async (_id: string) => {
    try {
        const post = await Post.findOne({ _id }).populate('user_Id', 'lastName firstName -_id').select('-deleted_at');
        return post;
      } catch (error) {
        throw new Error('Erreur lors de la recherche du POST_id');
      }
  },

  findAll: async () => {
    try {
      const posts = await Post.find().populate('user_Id', 'lastName firstName -_id').select('-deleted_at -is_deleted -created_at');
      return posts;
      } catch (error) {
        throw new Error('Erreur lors de la recherche des POSTs');
      }
  },

  findByUserId: async (user_Id: string) => {
    try {
      if (!user_Id){
        throw new Error("ID_USER_FALSE")
      }
      const posts = await Post.find({ user_Id: user_Id})
        .populate('user_Id', 'lastName firstName -_id')
        .select('-deleted_at -is_deleted -created_at');
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