/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import upload from '../configs/multer.js';
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

// Create Router
const aiRouter = express.Router();

// Routes
aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);
aiRouter.post(
  '/remove-image-background',
  upload.single('image'),
  auth,
  removeImageBackground,
);
aiRouter.post(
  '/remove-image-object',
  upload.single('image'),
  auth,
  removeImageObject,
);
aiRouter.post('/resume-review', upload.single('resume'), auth, resumeReview);

// Export
export default aiRouter;
