import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({username:req.res.body});
        if(!user)  return next(createError(404,"User not found."))
            const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.passsword
        
            );
            (!isPasswordCorrect)
            return next(createError(404,"Wrong username or password"))
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.jwt)
           
            const {passsword,isAdmin,...otherDetails} = user._doc;
            res.cookie("access-token",token,{
                httpOnly:true
            })
            res.status(200).json({...otherDetails});
    } catch (error) {
        nest(error);
    }
}