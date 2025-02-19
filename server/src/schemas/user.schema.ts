import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import { IUser } from "../models/user";

export const UserSchema = new Schema<IUser>({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Avatar" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false, required: true },
    deleted_at: { type: Date, default: null, required: false }
});

export default mongoose.model("users", UserSchema);

// // Créer le modèle User à partir du schéma
// const User = model('User', UserSchema);

// export default User; // Exporter le modèle pour l'utiliser dans le contrôleur