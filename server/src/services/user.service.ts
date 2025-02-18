import User from "../schemas/user.schema";

// Fonction pour trouver un utilisateur par email
export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error('Erreur lors de la recherche de l\'utilisateur');
  }
};