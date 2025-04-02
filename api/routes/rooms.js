import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { deleteRoom, createRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";

const router = express.Router();

// Create a new room for a hotel
router.post("/:hotelid", verifyAdmin, createRoom);

// Get all rooms
router.get("/", getRooms);

// Get a specific room by ID
router.get("/:id", getRoom);

// Update a room
router.put("/:id", verifyAdmin, updateRoom);

// Delete a specific room
router.delete("/:id", verifyAdmin, deleteRoom);

export default router;
