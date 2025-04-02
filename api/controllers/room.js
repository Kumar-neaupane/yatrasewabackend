import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../../utils/error.js";

// Create a new room and associate it with a hotel
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            return next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

// Get all rooms
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find(); // Fetch all rooms
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific room by ID
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a room
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a specific room and remove it from the associated hotel
export const deleteRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Remove the room from the associated hotel
        await Hotel.updateMany(
            { rooms: req.params.id },
            { $pull: { rooms: req.params.id } }
        );

        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
