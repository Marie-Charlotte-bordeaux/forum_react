import mongoose, { Document } from "mongoose";
import { IUser } from "./user";

export interface IAvatar extends Document {
    userId: mongoose.Types.ObjectId | IUser;
    avatarUrl: string;
    is_active: boolean;
    created_at: Date;
    updated_at?: Date;
    isDeleted: boolean
    deleted_at?: Date
}