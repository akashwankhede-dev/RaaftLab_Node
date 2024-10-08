import { Request, Response } from 'express';
import User from '../models/usermodel';

export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const sortBy = req.query.sortBy as string || 'email';  // Cast to string

  try {
    const users = await User.find()
      .sort({ [sortBy]: 1 })  // Sorting by the string field, ascending
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users' });
  }
};
