import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel, deleteHotel, updateHotel, getHotels, getHotel } from "../controllers/hotel.js";

const router = express.Router();

// Create a new hotel
router.post("/", createHotel);

// Get all hotels
router.get("/", getHotels);

// Get a specific hotel by ID
router.get("/:id", getHotel);

// Update a hotel
router.put("/:id", updateHotel);

// Delete a specific hotel
router.delete("/:id", deleteHotel);

export default router;
