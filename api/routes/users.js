import express from "express";
import Hotel from "../models/Uotel.js";
import { createUser, deleteUser, updateUser, getUsers, getUser } from "../controllers/hotel.js";
import { verifyToken,verifyUser,verifyAdmin } from "../../utils/verifyToken.js";

const router = express.Router();
/*

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("Hello user,you are logged in")
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("Hello user,you are logged in and you can delete your account")
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("Hello Admin,you are logged in and you can delete All account")
})*/

// Create a new user
router.post("/",  createUser);

// Get all user
router.get("/",verifyAdmin, getUsers);

// Get a specific hotel by ID
router.get("/:id",verifyUser, getUser);

// Update a hotel
router.put("/:id", verifyUser, updateUser);

// Delete a specific user
router.delete("/:id",verifyUser, deleteUser);

export default router;
