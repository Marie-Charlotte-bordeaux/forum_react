import { UserContext } from "./userContext";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

// 🔹 Définition du type User
interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Ajout de loading

    // 🔹 Vérification de l'authentification au chargement de la page
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/me", {
                    withCredentials: true, // 🔹 Important pour envoyer les cookies !
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erreur de récupération de l'utilisateur :", error);
                setUser(null);
            } finally {
                setLoading(false); 
            }
        };

        checkUser();
    }, []);

    // 🔹 Inscription
    async function signup(signupData: { firstName: string; lastName: string; email: string; password: string }) {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", signupData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.status === 201) {
                setUser(response.data.user);
                return { success: true, message: "Inscription réussie." };
            }
            return { success: false, message: "Erreur lors de l'inscription." };
        } catch (err) {
            console.error("Erreur d'inscription :", err);
            return { success: false, message: "Une erreur est survenue." };
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Connexion
    async function signin(signinData: { email: string; password: string }) {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", signinData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.status === 200) {
                setUser(response.data.user);
                return { success: true, message: "Connexion réussie." };
            }
            return { success: false, message: "Email ou mot de passe incorrects." };
        } catch (err) {
            console.error("Erreur de connexion :", err);
            return { success: false, message: "Une erreur est survenue." };
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Déconnexion
    async function logout() {
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.error("Erreur lors de la déconnexion :", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{ user, signup, signin, logout, loading }}>
            {loading ? <p>Chargement...</p> : children} {/* loading UI */}
        </UserContext.Provider>
    );
}
