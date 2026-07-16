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
import { securityMiddleware, sanitizeMiddleware, apiLimiter } from './middlewares/security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables load karein
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Database connection
connectDB();

const app = express();

// --- SECURITY & CORE MIDDLEWARES ---
app.use(securityMiddleware); // Helmet (Must be early)
app.use(cors());

// Parse incoming JSON requests with 10kb body limit
app.use(express.json({ limit: '10kb' })); 

// Sanitize inputs AFTER parsing the body (Prevents NoSQL Injection)
app.use(sanitizeMiddleware); 

// Rate limiting for API paths
app.use('/api/', apiLimiter);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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