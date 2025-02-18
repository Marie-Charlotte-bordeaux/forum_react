import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IAvatar } from "../models/avatar";

export const AvatarSchema = new Schema<IAvatar>({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    avatarUrl: { type: String, required: true },
    activated_at: { type: Boolean },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false, required: true },
    deleted_at: { type: Date, default: null, required: false }
}) 