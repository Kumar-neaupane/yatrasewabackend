import express from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

// Use /register to avoid conflicts with other auth endpoints
router.post('/register', register);

export default router;
