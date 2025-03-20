"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /packages/express-backend/src/routes/purchase.ts
const express_1 = require("express");
const Purchase_1 = __importDefault(require("../models/Purchase"));
const auth_1 = require("./auth");
const router = (0, express_1.Router)();
/**
 * POST /api/purchases
 * Create a new purchase.
 * Expects purchase data in the request body.
 */
router.post('/', auth_1.verifyAuthToken, async (req, res) => {
    try {
        const { date, name, cost, category, person, assignees } = req.body;
        if (!date || !name || !cost || !category || !person || !assignees) {
            res.status(400).json({ message: 'All purchase fields are required.' });
            return;
        }
        const newPurchase = new Purchase_1.default({
            date,
            name,
            cost,
            category,
            person,
            assignees,
        });
        await newPurchase.save();
        res.status(201).json({ message: 'Purchase created successfully.', purchase: newPurchase });
    }
    catch (error) {
        console.error('Error creating purchase:', error);
        res.status(500).json({ message: 'Server error while creating purchase.' });
    }
});
/**
 * GET /api/purchases
 * Retrieve all purchases (or optionally filter by household/user).
 */
router.get('/', auth_1.verifyAuthToken, async (req, res) => {
    try {
        // Optionally, you could filter by req.user.userId if purchases are user-specific.
        const purchases = await Purchase_1.default.find();
        res.status(200).json({ purchases });
    }
    catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ message: 'Server error fetching purchases.' });
    }
});
/**
 * DELETE /api/purchases/:id
 * Delete a purchase by its ID.
 */
router.delete('/:id', auth_1.verifyAuthToken, async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase_1.default.findByIdAndDelete(id);
        if (!purchase) {
            res.status(404).json({ message: 'Purchase not found.' });
            return;
        }
        res.status(200).json({ message: 'Purchase deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting purchase:', error);
        res.status(500).json({ message: 'Server error deleting purchase.' });
    }
});
exports.default = router;
