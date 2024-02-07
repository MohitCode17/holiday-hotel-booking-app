import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel-models";
import { verifyToken } from "../middlewares/verifyToken";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

// MULTER CONFIGURATION
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
});

// ADD HOTEL ROUTE
// path     /api/my-hotels

router.post("/", 
    verifyToken,
    [
        // Same as check(), but only validates req.body.
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    ], 
    upload.array("imageFiles", 6), 
    async (req:Request, res:Response) => {
    // Main Login Here...
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotelData:HotelType = req.body;
        
        // 1. Upload the image files to Cloudinary
        const imageUrls = await uploadImages(imageFiles);

        // 2. If upload was successful, add the URLs to the new hotel
        newHotelData.imageUrls = imageUrls;
        newHotelData.lastUpdated = new Date();
        newHotelData.userId = req.userId;

        // 3. Save the new hotel in database
        const hotel = new Hotel(newHotelData);
        await hotel.save();

        // 4. Return a success response
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// FETCH HOTELS API
// path     /api/my-hotels

router.get("/", verifyToken, async (req:Request, res:Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });

        if(!hotels) return res.status(404).json({message: "No hotel found"});

        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// FUNCTION TO UPLOAD IMAGES TO CLOUDINARY AND GET BACK THE URL
async function uploadImages (imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        // Converts per images into buffer data to a Base64-encoded string
        const b64 = Buffer.from(image.buffer).toString("base64");
        // create a Data URI 
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        // res has url which comes from cloudinary
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
};


export default router;