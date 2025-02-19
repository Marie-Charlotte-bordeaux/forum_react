import jwt from 'jsonwebtoken';

// Clé secrète pour signer les JWT.  **IMPORTANT :** Gardez cette clé secrète en sécurité et ne la partagez jamais publiquement (utilisez une variable d'environnement).
const JWT_SECRET = process.env.SECRET_KEY || 'kaka'; // Clé de secours si la variable d'environnement n'est pas définie (à des fins de développement uniquement)
const expiresIn = process.env.EXPIRE_IN || 3600 ;

// Fonction pour générer un JWT
export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn : 3600 }); // Durée de validité du token (ici, 1 heure)
  return token;
};

// Fonction pour vérifier un JWT
export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null; // Token invalide ou expiré
  }
};