// /packages/express-backend/src/routes/household.ts
import { Router, Request, Response } from 'express';

// extend the request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}
import Household from '../models/Household';
import { verifyAuthToken } from './auth';

const router = Router();

/**
 * POST /api/household
 * Creates a new household for the authenticated user.
 * Expects { householdName: string, roommates: [{ name: string, email: string }] } in the request body.
 */
router.post('/', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
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
    // create new household using the logged in user's ID
    const newHousehold = new Household({
      user: req.user.userId,
      householdName,
      roommates,
    });
    await newHousehold.save();
    res.status(201).json({ message: 'Household created successfully.', household: newHousehold });
  } catch (error) {
    console.error('Household creation error:', error);
    res.status(500).json({ message: 'Server error during household creation.' });
  }
});

/**
 * GET /api/household
 * Retrieves the household for the authenticated user.
 */
router.get('/', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.user, req.user?.userId);
    if (!req.user || !req.user.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const household = await Household.findOne({ user: req.user.userId });
    res.status(200).json({ household });
  } catch (error) {
    console.error('Error fetching household:', error);
    res.status(500).json({ message: 'Server error fetching household.' });
  }
});

export default router;