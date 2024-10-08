import { Request, Response } from 'express';
import User, { IUser } from '../models/usermodel';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

// Register User
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in' });
  }
};
