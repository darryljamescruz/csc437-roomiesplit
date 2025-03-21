"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("./auth");
const router = (0, express_1.Router)();
/**
 * PATCH /api/users/preferences
 * Updates the current user's preferences.
 * Expects { darkModeEnabled: boolean } in the request body.
 */
router.patch('/', auth_1.verifyAuthToken, async (req, res) => {
    try {
        console.log('Preferences PATCH called with body:', req.body);
        console.log('User attached to request:', req.user);
        const { darkModeEnabled } = req.body;
        if (typeof darkModeEnabled !== 'boolean') {
            res.status(400).json({ message: 'Invalid value for darkModeEnabled.' });
            return;
        }
        // Assuming req.user.userId is set by verifyAuthToken
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user.userId, { darkModeEnabled }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json({ message: 'Preferences updated.', darkModeEnabled: updatedUser.darkModeEnabled });
    }
    catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ message: 'Server error updating preferences.' });
    }
});
exports.default = router;
