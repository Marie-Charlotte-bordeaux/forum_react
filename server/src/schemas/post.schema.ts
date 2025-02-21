import mongoose, { Schema } from "mongoose";
import { IPost } from "../models/post";

export const PostSchema = new Schema({
    user_Id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true},
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    is_deleted: { type: Boolean, default: false, required: true },
  });
  
export default mongoose.model("posts", PostSchema);
