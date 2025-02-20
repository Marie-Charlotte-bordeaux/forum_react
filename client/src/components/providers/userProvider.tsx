import { UserContext, UserContextType } from "./userContext";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
                if (response.status === 200) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    async function signup(signupData: any) {
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", signupData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.status === 200) {
                setUser(response.data.user);
                return { success: true, message: "Inscription réussie." };
            }
            return { success: false, message: "Email ou mot de passe incorrects." };
        } catch (err) {
            console.error("Sign up error:", err);
            return { success: false, message: "Une erreur est survenue." };
        }
    }

    return (
        <UserContext.Provider value={{ user, signup }}>
            {children}
        </UserContext.Provider>
    );
}
