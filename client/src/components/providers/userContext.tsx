import React, { createContext, useState } from "react";

// 🔹 Définition du type des données utilisateur
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// 🔹 Définition du type du contexte utilisateur
interface UserContextType {
  user: User | null;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
}

// 🔹 Création du contexte avec un type par défaut
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      // Simuler un appel API (remplace ça par une requête HTTP)
      console.log("Tentative d'inscription avec :", data);
      setUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password });

      return { success: true, message: "Inscription réussie !" };
    } catch (error) {
      console.log(error)
      return { success: false, message: "Erreur lors de l'inscription." };
    }
  };

  return (
    <UserContext.Provider value={{ user, signup }}>
      {children}
    </UserContext.Provider>
  );
};
