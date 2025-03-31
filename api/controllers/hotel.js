import Hotel from "../models/Hotel.js";

// Create a new hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all hotels
export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find(); // Fetch all hotels
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific hotel by ID
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a hotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a specific hotel
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
