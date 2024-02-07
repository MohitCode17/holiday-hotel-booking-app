import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// IMPORTING ROUTES
import userRoutes from "./routes/user-route";
import authRoutes from "./routes/auth-route";
import myHotelsRoutes from "./routes/myHotels-route";

// CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_CONNECTION_URL as string);

const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});