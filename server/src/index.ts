import express, { Request, Response } from "express";
import { connectToMongo } from "./utils/db";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World !!!!!");
});

app.listen(port, () => {
    console.log("Server running on http://localhost:5000");
    connectToMongo();
});