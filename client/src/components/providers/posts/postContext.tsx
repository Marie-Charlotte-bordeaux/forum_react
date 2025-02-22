import { createContext } from "react";

interface Post {
    _id: string;
    title: string;
    content: string;
    user_Id: string;
}

interface PostContextType {
    post: Post | null;
    posts: Post[];
    create: (data: { title: string; content: string }) => Promise<{ success: boolean; message: string; data?: Post, error?: unknown }>;
    getPost: (postId: string) => Promise<{ success: boolean; message: string; data?: Post, error?: unknown }>;
    getAllPosts: () => Promise<{ success: boolean; message: string; data?: Post[], error?: unknown }>;
    getPostByUserId: (userId: string) => Promise<{ success: boolean; message: string; data?: Post[], error?: unknown }>;
    loading: boolean;
}

// Valeur par défaut 
const defaultPostContext: PostContextType = {
    post: null,
    posts: [],
    create: async () => ({ success: false, message: "ne peut être créé" }),
    getPost: async () => ({ success: false, message: "ne peut être affiché" }),
    getAllPosts: async () => ({ success: false, message: "ne peuvent être affichés" }),
    getPostByUserId: async () => ({ success: false, message: "ne peuventt être affiché pour cet user" }),
    loading: false
};

export const PostContext = createContext<PostContextType>(defaultPostContext); // Pas de null ici