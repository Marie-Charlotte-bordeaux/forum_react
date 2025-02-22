
import { useState, useContext } from "react";
import { PostContext } from "../providers/posts/postContext";

const PostForm: React.FC = () => {
  const postContext = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  if (!postContext) return null;
  const { create } = postContext;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    console.log("Données envoyées :", { title, content });

    try {
        const response = await create({ title, content });

        console.log("Réponse de create :", response); // ➜ Ajoute ce log

        if (response?.success) {
            setMessage("Post créé avec succès !");
            setTitle("");
            setContent("");
        } else {
            console.error("Erreur lors de la création :", response?.message);
            setMessage("Erreur : " + response?.message);
        }
    } catch (error) {
        console.error("⚠ Erreur inattendue dans handleSubmit :", error);
        setMessage("Une erreur inattendue est survenue.");
    }
}

return (
  <>
  <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-gray-300 text-xl font-semibold text-center mb-4">Créer un post</h2>

      {message && <p className="text-center text-sm text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titre du post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Contenu du post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => console.log("🟢 Bouton cliqué !")}>
          Publier
        </button>
      </form>
    </div>
  </>
)
}
export default PostForm;