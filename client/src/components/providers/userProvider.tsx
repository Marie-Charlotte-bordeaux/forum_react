import { UserContext } from "./userContext";
import { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function UserProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const reponse = await fetch("/api/users/me", {
        credentials: 'include'
      });
      if (reponse.status === 200) {
        const data = await reponse.json()
        setUser(data);
      }
    })();
  }, []);

  async function signup(signupData: unknown) {
    try {
      const reponse = await fetch('/api/users/register', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(signupData)
      });

      if (reponse.status === 200) {
        const data = await reponse.json();
        setUser(data.user);
        return { success: true, message: "Inscription spécie." }
      }
      return { success: false, message: "Email ou mot de passe incorrecte." }

    } catch (err) {
      console.log(err);
      return { success: false, message: "Une erreur est survenue." }
    }
  }

    return (
        <UserContext.Provider value={{ user: user, signup }}>{children}</UserContext.Provider>
    )
}