import { Request, Response } from 'express';
import User from '../models/usermodel';

// Get all users with pagination and sorting
export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sortBy = 'email' } = req.query;
  try {
    const users = await User.find()
      .sort(sortBy)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user' });
  }
};
