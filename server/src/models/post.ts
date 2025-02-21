import mongoose, { Document} from "mongoose";
import { IUser } from "./user";

export interface IPost extends Document {
    user_Id: mongoose.Types.ObjectId | IUser;
    title: string;
    likesCount: number;
    commentsCount: number;
    content: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
    is_deleted: boolean;
}                 
