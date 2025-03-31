import User from "../models/User.js";
import bcrypt from "bcrypt";

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
