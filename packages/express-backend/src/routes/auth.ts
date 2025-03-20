import { Router, Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

// Get the JWT secret from environment variables and assert it is defined.
const signatureKey: string = process.env.JWT_SECRET!;
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
function generateAuthToken(user: IUser): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { userId: user._id, email: user.email },
      signatureKey,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
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
export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.get("Authorization");
  // Expected format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }
  jwt.verify(token, signatureKey, (error, decoded) => {
    if (error) {
      res.status(403).json({ message: 'Invalid token' });
    } else {
      // Optionally, attach decoded token to request for later use:
      // req.user = decoded;
      next();
    }
  });
}

// Registration endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).json({ message: 'Full name, email, and password are required.' });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with that email already exists.' });
      return;
    }

    // Create new user (password is hashed in the pre-save hook)
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

    // Find the user by email
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

    // Generate a JWT token for the authenticated user
    const token = await generateAuthToken(user);
    res.status(200).json({ token, message: 'Logged in successfully.' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

export default router;