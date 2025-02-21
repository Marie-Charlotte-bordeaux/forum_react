import express from "express";
import { connectToMongo } from "./utils/db";
import userRouter from "./routes/user.route";
import cors from "cors";
import postRouter from "./routes/post.route";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());

// Configurer CORS pour permettre les requêtes depuis le frontend (React)
const corsOptions = {
    origin: 'http://localhost:5173', // URL du frontend React
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // méthodes HTTP autorisées
    credentials: true, //utiliser les cookies ou partager des cookies entre frontend et backend
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// *******************************
// USER
// *******************************
app.use("/api/users", userRouter);

// *******************************
// Posts forum
// *******************************

app.use("/api/posts", postRouter);


// *******************************
// Start server
// *******************************
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