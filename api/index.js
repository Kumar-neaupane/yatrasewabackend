import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js"; // Ensure correct route import

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// MongoDB Connection Function
const connect = async () => {
    try {
        if (!process.env.MONGO) {
            throw new Error("MongoDB URI (MONGO) not found in .env file.");
        }
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process on failure
    }
};

// MongoDB Event Listeners
mongoose.connection.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));

// Middleware
app.use(express.json()); // Enable JSON body parsing

// Routes
app.use("/api/hotels", hotelRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
});

// Start Server
app.listen(port, async () => {
    await connect();
    console.log(`Server is running on http://localhost:${port}`);
});
