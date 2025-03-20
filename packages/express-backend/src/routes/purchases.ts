// /packages/express-backend/src/routes/purchase.ts
import { Router, Request, Response } from 'express';
import Purchase from '../models/Purchase';
import { verifyAuthToken } from './auth';

const router = Router();

/**
 * POST /api/purchases
 * Create a new purchase.
 * Expects purchase data in the request body.
 */
router.post('/', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, name, cost, category, person, assignees } = req.body;
    if (!date || !name || !cost || !category || !person || !assignees) {
      res.status(400).json({ message: 'All purchase fields are required.' });
      return;
    }
    const newPurchase = new Purchase({
      date,
      name,
      cost,
      category,
      person,
      assignees,
    });
    await newPurchase.save();
    res.status(201).json({ message: 'Purchase created successfully.', purchase: newPurchase });
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Server error while creating purchase.' });
  }
});

/**
 * GET /api/purchases
 * Retrieve all purchases (or optionally filter by household/user).
 */
router.get('/', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
  try {
    // Optionally, you could filter by req.user.userId if purchases are user-specific.
    const purchases = await Purchase.find();
    res.status(200).json({ purchases });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ message: 'Server error fetching purchases.' });
  }
});

/**
 * DELETE /api/purchases/:id
 * Delete a purchase by its ID.
 */
router.delete('/:id', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) {
      res.status(404).json({ message: 'Purchase not found.' });
      return;
    }
    res.status(200).json({ message: 'Purchase deleted successfully.' });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ message: 'Server error deleting purchase.' });
  }
});

/**
 * PATCH /api/purchases/:id
 * Updates an existing purchase. Expects updated purchase data in the request body.
 */
router.patch('/:id', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Retrieve updated data from the request body.
    // It's assumed that the client sends only the fields that need updating.
    const updatedData = req.body;

    // Find the purchase by id and update it.
    // { new: true } returns the updated document.
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPurchase) {
      res.status(404).json({ message: 'Purchase not found.' });
      return;
    }

    res.status(200).json({
      message: 'Purchase updated successfully.',
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ message: 'Server error updating purchase.' });
  }
});


export default router;