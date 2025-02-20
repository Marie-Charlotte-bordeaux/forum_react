import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserContext } from "../providers/userContext"; // Assure-toi que le chemin est correct

// 🔹 Définition du schéma de validation avec Zod
const schema = z
  .object({
    lastName: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
    firstName: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// 🔹 Type des données du formulaire
type FormData = z.infer<typeof schema>;

const SignupForm: React.FC = () => {
      const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    
  // 🔹 Utiliser le contexte correctement
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    return <p>Chargement...</p>; // ⚠️ Vérification pour éviter une erreur si `UserContext` est null
  }const { signup } = userContext;

  // 🔹 Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      // Appeler la fonction signup depuis le contexte
      const result = await signup(data);

      // Vérifier si l'inscription a réussi et afficher un message approprié
      if (result.success) {
        alert(result.message); // Inscription réussie
      } else {
        alert(result.message); // Message d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-950 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🔹 Champ Nom */}
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input {...register("lastName")} className="w-full p-2 border rounded" placeholder="Votre nom" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        
        {/* 🔹 Champ Prénom */}
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input {...register("firstName")} className="w-full p-2 border rounded" placeholder="Votre prénom" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        {/* 🔹 Champ Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} type="email" className="w-full p-2 border rounded" placeholder="Votre email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* 🔹 Champ Mot de passe */}
        <div>
          <label className="block text-sm font-medium">Mot de passe</label>
          <input {...register("password")} type="password" className="w-full p-2 border rounded" placeholder="Votre mot de passe" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* 🔹 Champ Confirmation du mot de passe */}
        <div>
          <label className="block text-sm font-medium">Confirmer le mot de passe</label>
          <input {...register("confirmPassword")} type="password" className="w-full p-2 border rounded" placeholder="Confirmez votre mot de passe" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* 🔹 Bouton Soumettre */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
