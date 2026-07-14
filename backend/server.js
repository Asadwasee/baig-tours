import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Environment variables load karein
dotenv.config();

// Database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Base Test Route
app.get('/', (req, res) => {
  res.send('Baig Tours MERN Backend is running smoothly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});