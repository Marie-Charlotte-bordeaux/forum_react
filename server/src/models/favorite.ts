import mongoose, { Document } from "mongoose";
import { IPost } from "./post";
import { IUser } from "./user";

export interface IFavorite extends Document {
  postIDs: [mongoose.Types.ObjectId | IPost];
  userId: mongoose.Types.ObjectId | IUser;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: Boolean;
}
