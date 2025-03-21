import { Router, Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { verifyAuthToken } from './auth';
const router = Router();


/**
 * PATCH /api/users/preferences
 * Updates the current user's preferences.
 * Expects { darkModeEnabled: boolean } in the request body.
 */
router.put('/', verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
    try {
      const { darkModeEnabled } = req.body;
      if (typeof darkModeEnabled !== 'boolean') {
        res.status(400).json({ message: 'Invalid value for darkModeEnabled.' });
        return;
      }
      // Assuming req.user.userId is set by verifyAuthToken
      const updatedUser = await User.findByIdAndUpdate(
        (req as any).user.userId,
        { darkModeEnabled },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.status(200).json({ message: 'Preferences updated.', darkModeEnabled: updatedUser.darkModeEnabled });
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ message: 'Server error updating preferences.' });
    }
  });

  export default router;