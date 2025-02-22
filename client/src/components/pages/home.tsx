import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CardPost from "../layout/cardPost";
import { PostContext } from "../providers/posts/postContext";
import { UserContext } from "../providers/userContext";

function Home() {
  const { posts, getAllPosts } = useContext(PostContext);
   // Récupérer les posts au chargement de la page
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

 // Redirige vers la connexion si non connecté
  const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userContext?.user) {
            navigate("/login");
        }
    }, [navigate, userContext?.user]);

    if (!userContext?.user) return <p>Chargement...</p>;



  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800">
      <h1 className="text-2xl font-bold text-center mb-4 text-white">Tous les posts</h1>
      <NavLink to="/formPost" className="block text-blue-500 hover:underline mb-4">
        Créer un post
      </NavLink>

      {/* Affichage des posts */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <CardPost
              key={post._id}
              firstname={"Utilisateur"} // À remplacer par le vrai prénom si dispo
              avatar={""} // Ajouter l'avatar si disponible
              rating={4} // Tu peux ajouter un rating aléatoire ou basé sur des données
              content={post.content}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">Aucun post disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
