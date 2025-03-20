"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            res.status(400).json({ message: 'Full name, email, and password are required.' });
            return;
        }
        // Check if the user exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with that email already exists.' });
            return;
        }
        // Create new user (password is hashed in pre-save hook)
        const newUser = new User_1.default({ fullName, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }
        // Find user by email
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        // Compare provided password with stored hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        // TODO: Generate and send a token (e.g., JWT) if needed
        res.status(200).json({ message: 'Logged in successfully.' });
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});
exports.default = router;
