import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
// Route Imports
import authRoutes from './routes/authRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables load karein
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Database connection
connectDB();

const app = express();

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(cors());
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Base Test Route
app.get('/', (req, res) => {
  res.send('Baig Tours MERN Backend is running smoothly...');
});

// Centralized Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});