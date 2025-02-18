import express from "express";
import { connectToMongo } from "./utils/db";
import userRouter from "./routes/user.route";
import cors from "cors";


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



// Configurer CORS pour permettre les requêtes depuis le frontend (React)
const corsOptions = {
  origin: 'http://localhost:5174', // URL du frontend React
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // méthodes HTTP autorisées
  credentials: true, //utiliser les cookies ou partager des cookies entre frontend et backend
};

app.use(cors(corsOptions));

startServer();