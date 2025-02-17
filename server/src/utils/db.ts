import mongoose from "mongoose";

export const connectToMongo = async () => {
    try {
        const uri = 'mongodb://localhost:27017/db_forum';
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};