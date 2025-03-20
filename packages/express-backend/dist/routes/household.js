"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("../types");
const Household_1 = __importDefault(require("../models/Household"));
const auth_1 = require("./auth");
const router = (0, express_1.Router)();
/**
 * POST /api/household
 * Creates a new household for the authenticated user.
 * Expects { householdName: string, roommates: [{ name: string, email: string }] } in the request body.
 */
router.post('/', auth_1.verifyAuthToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { householdName, roommates } = req.body;
        if (!householdName || !roommates) {
            res.status(400).json({ message: 'householdName and roommates are required.' });
            return;
        }
        // Create new household using the logged-in user's ID
        const newHousehold = new Household_1.default({
            user: req.user.userId,
            householdName,
            roommates,
        });
        await newHousehold.save();
        res.status(201).json({ message: 'Household created successfully.', household: newHousehold });
    }
    catch (error) {
        console.error('Household creation error:', error);
        res.status(500).json({ message: 'Server error during household creation.' });
    }
});
/**
 * GET /api/household
 * Retrieves the household for the authenticated user.
 */
router.get('/', auth_1.verifyAuthToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const household = await Household_1.default.findOne({ user: req.user.userId });
        res.status(200).json({ household });
    }
    catch (error) {
        console.error('Error fetching household:', error);
        res.status(500).json({ message: 'Server error fetching household.' });
    }
});
/**
 * PUT /api/household/:id
 * Updates the household data (e.g., updating roommates) for the authenticated user.
 * Expects { roommates: [{ name: string, email: string }] } in the request body.
 */
router.put('/:id', auth_1.verifyAuthToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const { roommates } = req.body;
        if (!roommates) {
            res.status(400).json({ message: 'Roommates data is required for update.' });
            return;
        }
        // Find and update the household only if it belongs to the authenticated user.
        const household = await Household_1.default.findOneAndUpdate({ _id: id, user: req.user.userId }, { roommates }, { new: true });
        if (!household) {
            res.status(404).json({ message: 'Household not found or you are not authorized.' });
            return;
        }
        res.status(200).json({ message: 'Household updated successfully.', household });
    }
    catch (error) {
        console.error('Error updating household:', error);
        res.status(500).json({ message: 'Server error updating household.' });
    }
});
/**
 * DELETE /api/household/:id
 * Deletes the entire household for the authenticated user.
 */
router.delete('/:id', auth_1.verifyAuthToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        // Find and delete the household only if it belongs to the authenticated user.
        const household = await Household_1.default.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!household) {
            res.status(404).json({ message: 'Household not found or you are not authorized.' });
            return;
        }
        res.status(200).json({ message: 'Household deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting household:', error);
        res.status(500).json({ message: 'Server error deleting household.' });
    }
});
exports.default = router;
