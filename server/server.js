/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

// Create Express App
const app = express();

// Port
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});
app.use(requireAuth());

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
