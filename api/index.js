import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js"; // Ensure this is imported

export const register = async (req, res, next) => {
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user instance
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Store hashed password
        });

        // Save user to DB
        await newUser.save();
        res.status(201).json({ message: "User has been created successfully." });

    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const login = async (req, res, next) => {
    try {
        // Find user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found."));

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong username or password."));

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET, // Ensure this is correctly set in .env
            { expiresIn: "7d" } // Token expires in 7 days
        );

        // Exclude password from response
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Set HTTP-only cookie for security
        res.cookie("access-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict", // Prevent CSRF attacks
        });

        res.status(200).json({ ...otherDetails, token });

    } catch (error) {
        next(error);
    }
};
