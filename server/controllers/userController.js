/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import sql from '../configs/db.js';

// Get User Creations
const getUserCreations = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();

    // Get user creations
    const creations =
      await sql` SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC;`;

    // Send response
    res.status(200).json({ success: true, creations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Published Creations
const getPublishedCreations = async (req, res) => {
  try {
    // Get creations from database based on publish
    const creations =
      await sql` SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC;`;

    // Send response
    res.status(200).json({ success: true, creations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleLikeCreation = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const { id } = req.body;

    // Get creation
    const [creation] = await sql` SELECT * FROM creations WHERE id = ${id};`;

    // if creation not found
    if (!creation) {
      return res
        .status(400)
        .json({ success: false, message: 'Creation not found' });
    }

    // Toggle like
    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    // if user already liked
    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = 'Creation unliked';
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = 'Creation liked';
    }

    // Update likes
    const formattedArray = `{${updatedLikes.join(', ')}}`;

    // Update creation
    await sql` UPDATE creations SET likes = ${formattedArray}::TEXT[] WHERE id = ${id};`;

    // Send response
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export
export { getPublishedCreations, getUserCreations, toggleLikeCreation };
