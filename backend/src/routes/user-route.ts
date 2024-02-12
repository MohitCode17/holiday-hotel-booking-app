import express, { Request, Response } from "express";
import User from "../models/user-model";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

// REGISTER USER API ROUTE
// path     /api/users/register

router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 or more characters is required").isLength({min: 6}),
], async (req:Request, res:Response) => {
    try {
        // Check Error
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        };

        // Check if user is already register
        let user = await User.findOne({email: req.body.email});

        if(user) {
            return res.status(400).json({message: "User already exists"});
        };

        // Save new user into db
        user = new User(req.body);
        await user.save();

        // Stored JWT Token to HttpOnly Cookie
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_kEY as string, {expiresIn: "1d"});

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        res.status(201).json({message: "Registration Success"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// FETCH CURRENT(LOGGED IN) USER DETAILS API ROUTE
// path     /api/users/me

router.get("/me", verifyToken, async (req:Request, res:Response) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if(!user) {
            return res.status(400).json({message: "User not found"});
        };
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

export default router;