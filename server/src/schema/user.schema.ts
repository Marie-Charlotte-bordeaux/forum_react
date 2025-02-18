import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUser } from "../models/user";

export const UserSchema = new Schema<IUser>({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Avatar" } // Référence à l'avatar
});