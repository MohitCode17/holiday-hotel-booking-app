import express, { Request, Response } from "express";
import { HotelSearchResponse } from "../shared/types";
import Hotel from "../models/hotel-models";
import { param, validationResult } from "express-validator";
import { verifyToken } from "../middlewares/verifyToken";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

// SEARCH, PAGINATION, SORTING AND FILTERING API ROUTE
// path     /api/hotels/search
router.get("/search", async (req:Request, res:Response) => {
    try {

        const query = constructSearchQuery(req.query);

        // SORTING LOGIC
        let sortOptions = {};

        switch (req.query.sortOption) {
            case "starRating":
            sortOptions = { starRating: -1 };
            break;
            case "pricePerNightAsc":
            sortOptions = { pricePerNight: 1 };
            break;
            case "pricePerNightDesc":
            sortOptions = { pricePerNight: -1 };
            break;
        };

        // PAGINATION LOGIC
        // pageSize: Number of hotesl display on per page once search request hit
        const pageSize = 5;

        // pageNumber: The page number which we sent from frontend to get access particular page as query
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

        // skip: Number of hotels you skip, once pageNumber are comes in req.query
        // Suppose request comes to get pageNumber 3
        // (3 - 1) * 5 = 10, skip first 10 hotels or fist 2 pages as 1 page contain 5 hotels.
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);

        // total: Total number of hotels as per search result
        const total = await Hotel.countDocuments(query);

        // Send response containing pagination data
        const response:HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// FETCH SINGLE HOTEL BY ID API ROUTE
// path     /api/hotels/:id
router.get("/:id", [param("id").notEmpty().withMessage("Hotel ID is required")], async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    };
    try {
        const id = req.params.id.toString();

        const hotel = await Hotel.findById(id);

        if(!hotel) return res.status(404).json({message: "Hotel not found"});

        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// CREATE PAYMENT INTENT TO STRIPE API ROUTE
// path     /api/hotels/:hotelID/bookings/payment-intent
router.post("/:hotelId/bookings/payment-intent", verifyToken, async (req:Request, res:Response) => {
    try {
        const { numberOfNight } = req.body;
        const hotelId = req.params.hotelId;

        const hotel = await Hotel.findById(hotelId);

        if(!hotel) {
            return res.status(404).json({message: "Hotel not found"});
        };

        // Calculate the total cost of booking
        const totalCost = hotel.pricePerNight * numberOfNight;

        // Create Payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost,
            currency: "inr",
            metadata: {
                hotelId,
                userId: req.userId,
            },
        });

        if(!paymentIntent.client_secret) {
            return res.status(500).json({message: "Error creating payment intent"});
        };

        const response = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret.toString(),
            totalCost,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    };
});


const constructSearchQuery = (queryParams: any) => {
    let constructedQuery:any = {};

    // $or query: Search for hotels whether either the "city" or "country" matches the provided "destination"
    if(queryParams.destination) {
        constructedQuery.$or = [
            {city: new RegExp(queryParams.destination, "i")},
            {country: new RegExp(queryParams.destination, "i")},
        ]
    };

    // it adds a condition to the query. It looks for hotels where the adultCount is greater than or equal to the provided value
    if(queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    };

    // it adds a condition to the query. It looks for hotels where the childCount is greater than or equal to the provided value
    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    };

    //  it adds a condition for hotels where all specified facilities are present. It uses $all for MongoDB's $all operator. It handles whether queryParams.facilities is an array or a single value.
    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
            ? queryParams.facilities
            : [queryParams.facilities],
        };
    };

    // it adds a condition for hotels where the type matches any of the provided types. It uses $in for MongoDB's $in operator. It handles whether queryParams.types is an array or a single value.
    if (queryParams.types) {
        constructedQuery.type = {
          $in: Array.isArray(queryParams.types)
            ? queryParams.types
            : [queryParams.types],
        };
    }
      
    // it adds a condition for hotels where the starRating matches any of the provided star ratings. It converts star ratings to integers and uses $in for MongoDB's $in operator. It handles whether queryParams.stars is an array or a single value.

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
          ? queryParams.stars.map((star: string) => parseInt(star))
          : parseInt(queryParams.stars);
    
        constructedQuery.starRating = { $in: starRatings };
    }

    // it adds a condition for hotels where the pricePerNight is less than or equal to the provided maximum price. It converts the value to a string for comparison.
    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }
    
    return constructedQuery;
};

export default router;