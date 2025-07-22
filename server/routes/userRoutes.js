/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

// Create Router
const userRouter = express.Router();

// Routes
userRouter.get('/get-user-creations', auth, getUserCreations);
userRouter.get('/get-published-creations', auth, getPublishedCreations);
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation);

// Export
export default userRouter;
