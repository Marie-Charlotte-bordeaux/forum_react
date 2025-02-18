import mongoose, { Schema } from "mongoose";
import { IFavorite } from "../models/favorite";

export const FavoriteSchema = new Schema<IFavorite>({
  postId: { 
    type: Object, 
    required: true ,
  },
  userId: { 
    type: Object, 
    required: true ,
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
})