"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = verifyAuthToken;
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Get the JWT secret from environment variables and assert it is defined.
const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}
/**
 * generateAuthToken
 * Generates a JWT for the given user that expires in 1 day.
 *
 * @param user - The user to include in the token payload.
 * @returns A Promise that resolves to a signed JWT token.
 */
function generateAuthToken(user) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, signatureKey, { expiresIn: '1d' }, (error, token) => {
            if (error)
                reject(error);
            else
                resolve(token);
        });
    });
}
/**
 * verifyAuthToken middleware
 * Checks the Authorization header for a valid JWT. If valid, calls next().
 * Otherwise, responds with 401 (Missing token) or 403 (Invalid token).
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
function verifyAuthToken(req, res, next) {
    const authHeader = req.get("Authorization");
    // Expected format: "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: 'Missing token' });
        return;
    }
    jsonwebtoken_1.default.verify(token, signatureKey, (error, decoded) => {
        if (error) {
            res.status(403).json({ message: 'Invalid token' });
        }
        else {
            // Optionally, attach decoded token to request for later use:
            // req.user = decoded;
            next();
        }
    });
}
// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            res.status(400).json({ message: 'Full name, email, and password are required.' });
            return;
        }
        // Check if the user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with that email already exists.' });
            return;
        }
        // Create new user (password is hashed in the pre-save hook)
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
        // Find the user by email
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
        // Generate a JWT token for the authenticated user
        const token = await generateAuthToken(user);
        res.status(200).json({ token, message: 'Logged in successfully.' });
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});
exports.default = router;
