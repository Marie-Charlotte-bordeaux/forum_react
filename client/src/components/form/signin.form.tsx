import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserContext } from "../providers/userContext";
import { useNavigate } from "react-router-dom";

// 🔹 Définition du schéma de validation avec Zod
const schemaLog = z
  .object({
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  });

// 🔹 Type des données du formulaire
type FormData = z.infer<typeof schemaLog>;

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schemaLog),
  });

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    return <p>Chargement...</p>; // verif pour éviter une erreur si `UserContext` est null
  }
  const { signin } = userContext;

  // 🔹 Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      const result = await signin(data);
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
    <>
      <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-lg rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* 🔹 Champ Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="name@flowbite.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 🔹 Champ Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 🔹 Bouton Soumettre */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
