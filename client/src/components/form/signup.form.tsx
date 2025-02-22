import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserContext } from "../providers/userContext";
import { useNavigate } from "react-router-dom";

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
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 🔹 Utiliser le contexte correctement
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    return <p>Chargement...</p>; // ⚠️ Vérification pour éviter une erreur si `UserContext` est null
  }
  const { signup } = userContext;

  // 🔹 Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      const result = await signup(data);

      // Vérifier si l'inscription a réussi et afficher un message approprié
      if (result.success) {
        alert(result.message); // Inscription réussie
        reset();
        navigate("/");
      } else {
        alert(result.message); // Message d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-300">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* 🔹 Champ Nom */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-500">Nom</label>
          <input
            {...register("lastName")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre nom"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        {/* 🔹 Champ Prénom */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            {...register("firstName")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre prénom"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        {/* 🔹 Champ Email */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* 🔹 Champ Mot de passe */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre mot de passe"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* 🔹 Champ Confirmation du mot de passe */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirmez votre mot de passe"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* 🔹 Bouton Soumettre */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
