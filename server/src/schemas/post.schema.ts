import mongoose, { Schema } from "mongoose";
import { IPost } from "../models/post";

export const PostSchema = new Schema<IPost>({
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true},
    content: { type: String, required: true },
    likesCount: { type: Number, required: true },
    commentsCount: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    is_deleted: { type: Boolean, default: false, required: true },
  });
  
export default mongoose.model("posts", PostSchema);
