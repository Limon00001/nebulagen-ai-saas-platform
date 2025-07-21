/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
const { neon } = require('@neondatabase/serverless');

// Database
const sql = neon(`${process.env.DATABASE_URL}`);

// Export
export default sql;
