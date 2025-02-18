import express from "express";
import { connectToMongo } from "./utils/db";
import userRouter from "./routes/user.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectToMongo();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();