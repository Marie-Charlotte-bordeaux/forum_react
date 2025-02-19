import mongoose, { Document} from "mongoose";
import { IAvatar } from "./avatar";

export interface IUser extends Document {
    _id: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    avatar?: mongoose.Types.ObjectId | IAvatar;
    created_at: Date;
    updated_at?: Date;
    isDeleted: boolean;
    deleted_at?: Date
} 
