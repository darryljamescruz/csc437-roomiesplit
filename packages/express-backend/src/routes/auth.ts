import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// Registration endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).json({ message: 'Full name, email, and password are required.' });
      return;
    }

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with that email already exists.' });
      return;
    }

    // Create new user (password is hashed in pre-save hook)
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
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
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

export default router;