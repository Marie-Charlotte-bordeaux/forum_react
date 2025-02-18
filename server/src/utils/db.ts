import mongoose from "mongoose";

export const connectToMongo = async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db_forum');
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
}
};