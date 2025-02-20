import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";  // Importer Axios

// 🔹 Définition du schéma de validation avec Zod
const schema = z
  .object({
    firstname: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
    lastname: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
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

  // 🔹 Fonction appelée lors de la soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      // Envoyer les données au backend via Axios
      const response = await axios.post("http://localhost:5000/api/users/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      if (response.status === 200) {
        // Si l'inscription est réussie, afficher un message ou effectuer d'autres actions
        alert("Inscription réussie !");
        console.log(response.data); // Afficher la réponse du backend
      } else {
        alert("Une erreur est survenue lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🔹 Champ Prénom */}
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input
            {...register("firstname")}
            className="w-full p-2 border rounded"
            placeholder="Votre prénom"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
        </div>

        {/* 🔹 Champ Nom */}
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            {...register("lastname")}
            className="w-full p-2 border rounded"
            placeholder="Votre nom"
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
        </div>

        {/* 🔹 Champ Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Votre email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* 🔹 Champ Mot de passe */}
        <div>
          <label className="block text-sm font-medium">Mot de passe</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Votre mot de passe"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* 🔹 Champ Confirmation du mot de passe */}
        <div>
          <label className="block text-sm font-medium">Confirmer le mot de passe</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Confirmez votre mot de passe"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* 🔹 Bouton Soumettre */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
