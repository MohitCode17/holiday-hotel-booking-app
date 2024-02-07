import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

// LOGIN USER API ROUTE
// path     /api/auth/login

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 or more characters is required").isLength({min: 6}),
], async (req: Request, res:Response) => {
    try {
        // Check for erros
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        };

        const {email, password} = req.body;

        // Check if user exists or not
        let user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found"});
        };

        // Check for valid password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        };

        // Stored JWT Token to HttpOnly Cookie
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_kEY as string, {expiresIn: "1d"});

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        // Send success response
        res.status(200).json({message: "Login Success"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"}); 
    }
});

// VALIDATE TOKEN ROUTE
// path     /api/auth/validate-token

router.get("/validate-token", verifyToken, async (req:Request, res:Response) => {
    res.status(200).json({userId: req.userId});
});

export default router;