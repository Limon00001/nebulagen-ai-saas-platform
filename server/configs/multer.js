/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import multer from 'multer';

// Multer Instance
const storage = multer.diskStorage({});

// Middleware
const upload = multer({ storage });

// Export
export default upload;
