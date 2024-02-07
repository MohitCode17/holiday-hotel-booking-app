import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// This set userId as Request to Express globally
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const verifyToken = (req: Request, res:Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];

    if(!token) {
        return res.status(404).json({message: "No token found"});
    }

    try {
        // Verify the token and get access user details from it.
        const decoded = jwt.verify(token, process.env.JWT_SECRET_kEY as string);
        // Provide userId to req
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}