import mongoose, { Schema } from "mongoose";
import { IPost } from "../models/post";

export const PostSchema = new Schema<IPost>({
    userId: { type: mongoose.Types.ObjectId, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    is_deleted: { type: Boolean, default: false, required: true },
  });
  
export default mongoose.model("posts", PostSchema);
