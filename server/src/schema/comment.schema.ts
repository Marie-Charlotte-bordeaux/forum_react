import { Schema } from "mongoose";
import { IComment } from "../models/comment";

export const CommentSchema = new Schema<IComment>({
  userId: { 
    type: Object, 
    required: true ,
  },
  postId: { 
    type: Object, 
    required: true ,
  },
  content: { 
    type: String, 
    required: true, 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  is_deleted: { 
    type: Boolean,
    default: false, 
    required: true,
  },
});