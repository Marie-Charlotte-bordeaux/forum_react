import mongoose, { Document} from "mongoose";
import { IUser } from "./user";

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId | IUser;
    content: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted: boolean;
} 
