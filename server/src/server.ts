import express, { Request, Response } from "express";
import { connectToMongo } from "./utils/db";
import userRouter from "./routes/user.route";


const app = express();
// Middleware pour parser le corps des requêtes en JSON
app.use(express.json())

const port = process.env.PORT;

//transformer dataform en json
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static('public'));

app.use("/api/users", userRouter)


app.listen(port, () => {
    console.log("Server running on http://localhost:5000");
    connectToMongo();
});