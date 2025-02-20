import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserContext } from "../providers/userContext"; // Assure-toi que le chemin est correct
import { useNavigate } from "react-router-dom";

// 🔹 Définition du schéma de validation avec Zod
const schemaLog = z
  .object({
    email: z.string().email("Adresse e-mail invalide"),
    password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  });

  // 🔹 Type des données du formulaire
  type FormData = z.infer<typeof schemaLog>;

  // 🔹 Permet de recuperer et comparer les données rentrées dans les inputs
  const SignInForm: React.FC = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schemaLog),
    });

  // 🔹 Utiliser le contexte correctement
  const userContext = useContext(UserContext);
  
  const navigate = useNavigate();

  if (!userContext) {
    return <p>Chargement...</p>; // ⚠️ Vérification pour éviter une erreur si `UserContext` est null
  }const { signin } = userContext;

    // 🔹 Fonction appelée lors de la soumission du formulaire
    const onSubmit = async (data: FormData) => {
      try {
        // Appeler la fonction signin depuis le contexte
        const result = await signin(data);

        // Vérifier si l'inscription a réussi et afficher un message approprié
        if (result.success) {
          alert(result.message); // Inscription réussie
          navigate("/");
        } else {
          alert(result.message); // Message d'erreur
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    };
    

  return(
    <>
  <form  onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">

    {/* 🔹 Champ Email */}
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
    </div>

    {/* 🔹 Champ Mot de passe */}
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

    {/* 🔹 Bouton Soumettre */}
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>

    </>
    );
  
};


export default SignInForm;