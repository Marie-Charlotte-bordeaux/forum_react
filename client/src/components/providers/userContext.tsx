import { createContext } from "react";

// 🔹 Définition du type des données utilisateur
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// 🔹 Définition du type du contexte utilisateur
interface UserContextType {
  user: User | null;
  signup: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  signin: (data: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

// 🔹 Création du contexte (valeur par défaut à `null`)
export const UserContext = createContext<UserContextType | null>(null);
