import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../providers/posts/postContext";

function Home() {
  const { posts, getAllPosts } = useContext(PostContext);

  // Récupérer les posts au chargement de la page
  useEffect(() => {
    getAllPosts();  // Appel pour récupérer les posts depuis l'API
  }, [getAllPosts]);
console.log('posts :::',posts)
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800">
      <h1 className="text-2xl font-bold text-center mb-4 text-white">Tous les posts</h1>
      <NavLink to="/formPost" className="block text-blue-500 hover:underline mb-4">
        Créer un post
      </NavLink>

      {/* Affichage des posts */}
      {posts.length === 0 ? (
        <p>Aucun post disponible pour l'instant.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="p-4 bg-gray-800 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <p className="text-gray-400">{post.content}</p>
            <div className="mt-2 text-gray-500">
              <span>{post.user_Id} {post.user_Id}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
