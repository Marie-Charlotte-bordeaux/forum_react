import mongoose, { Schema } from "mongoose";
import { IComment } from "../models/comment";

export const CommentSchema = new Schema<IComment>({
  userId: { type: mongoose.Types.ObjectId,  required: true },
  postId: { type: mongoose.Types.ObjectId, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  is_deleted: { type: Boolean, default: false, required: true },
});

export default mongoose.model("comments", CommentSchema);
