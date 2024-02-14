import express, { Request, Response } from "express";
import {verifyToken} from "../middlewares/verifyToken";
import Hotel from "../models/hotel-models";
import { HotelType } from "../shared/types";

const router = express.Router();

// GET MY BOOKINGS API
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: {$elemMatch: {userId: req.userId}},
        });

        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === req.userId);

            const hotelWithUserBookings:HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            };

            return hotelWithUserBookings;
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

export default router;