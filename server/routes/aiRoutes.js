/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import { generateArticle } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

// Create Router
const aiRouter = express.Router();

// Routes
aiRouter.post('/generate-article', auth, generateArticle);

// Export
export default aiRouter;
