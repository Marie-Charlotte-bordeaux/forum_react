import { Schema } from "mongoose";
import { IPost } from "../models/post";
import { IUser } from "../models/user";

export const PostSchema = new Schema<IPost>({
    userId: { 
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