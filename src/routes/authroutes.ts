import express, { Request, Response } from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await register(req, res);
    return result; // Ensure this returns a response object
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await login(req, res);
    return result; // Ensure this returns a response object
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
