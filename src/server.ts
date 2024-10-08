import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes';
import userRoutes from './routes/userroutes';
import { errorHandler } from './utils/errorhanddeler'; // Ensure this path is correct

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
