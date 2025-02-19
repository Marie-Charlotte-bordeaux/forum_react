import User, { UserSchema } from "../schemas/user.schema";

// Fonction pour trouver un utilisateur par email
export const UserService ={

  findUserByEmail: async (email: string) => {
    try {
      const user = await User.findOne({ email});
      return user;
    } catch (error) {
      throw new Error('Erreur lors de la recherche de l\'utilisateur');
    }
  },

  create: async (userData: any) =>{
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  }

} 