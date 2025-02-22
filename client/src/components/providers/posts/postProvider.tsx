import { PostContext } from "./postContext";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface Post {
    _id: string;
    title: string;
    content: string;
    user_Id: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown; 
}

const API_URL = "http://localhost:5000/api/posts";

export default function PostProvider({ children }: { children: ReactNode }) {
    const [post, setPost] = useState<Post | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

      // Charge tous les posts
    useEffect(() => {
        getAllPosts();
    }, []);

    async function create(createPostData: { title: string; content: string }): Promise<ApiResponse<Post>> {
        console.log("🟡 Tentative d'envoi au backend avec :", createPostData);

        try {
            const response = await axios.post(`${API_URL}/createPost`, createPostData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            console.log("🟢 Réponse reçue du backend :", response);

            if (response.status === 201) {
                setPost(response.data.post);
                return { success: true, message: "Création réussie.", data: response.data.post };
            }
            return { success: false, message: "Erreur lors de la création." };
        } catch (err) {
            console.error("❌ Erreur lors de la requête Axios :", err);
            return { success: false, message: "Une erreur est survenue.", error: err };
        }
    }


    async function getAllPosts(): Promise<ApiResponse<Post[]>> {
        try {
            const response = await axios.get(`${API_URL}/posts`, { withCredentials: true });
    
            console.log("Réponse de l'API pour récupérer les posts : ", response.data);
    
            if (response.status === 200) {
                setPosts(response.data.posts || response.data.post || []);
                console.log("Réponse de l'API pour récupérer les posts : ", response.data.posts || response.data.post);
                return { success: true, message: "Posts récupérés.", data: response.data.posts || response.data.post};
            }
            return { success: false, message: "Impossible de récupérer les posts.", error: response.data.message || "Erreur inconnue" };
        } catch (err) {
            console.error("Erreur lors de la récupération des posts :", err);
            return { success: false, message: "Une erreur est survenue.", error: err };
        }
    }

    async function getPostByUserId(userId: string): Promise<ApiResponse<Post[]>> {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`, { withCredentials: true });

            if (response.status === 200) {
                setPosts(response.data.posts);
                return { success: true, message: "Posts récupérés pour cet utilisateur.", data: response.data.posts };
            }
            return { success: false, message: "Erreur lors de la récupération.", error: response.data.message || "Erreur inconnue" };
        } catch (err) {
            console.error("Erreur getPostByUserId :", err);
            return { success: false, message: "Une erreur est survenue.", error: err };
        } 
    }

    async function getPost(postId: string): Promise<ApiResponse<Post>> {
        try {
            const response = await axios.get(`${API_URL}/${postId}`, { withCredentials: true });

            if (response.status === 200) {
                setPost(response.data.post);
                return { success: true, message: "Post récupéré.", data: response.data.post };
            }
            return { success: false, message: "Erreur lors de la récupération.", error: response.data.message || "Erreur inconnue" };
        } catch (err) {
            console.error("Erreur getPost :", err);
            return { success: false, message: "Une erreur est survenue.", error: err };
        } 
    }

    return (
        <PostContext.Provider value={{ post, posts, create, getPost, getAllPosts, getPostByUserId  }}>
            {children}
        </PostContext.Provider>
    );
}