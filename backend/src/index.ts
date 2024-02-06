import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose"
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_CONNECTION_URL as string);

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({message: "Test api testing"});
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});