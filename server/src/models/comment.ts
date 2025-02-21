import mongoose, { Document } from "mongoose";
import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment extends Document {
  postId : mongoose.Types.ObjectId | IPost;
  userId: mongoose.Types.ObjectId | IUser;
  content: String;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: boolean;
}