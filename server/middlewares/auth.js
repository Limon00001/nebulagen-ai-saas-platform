/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { clerkClient } from '@clerk/express';

// Auth Middleware
const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();
    const hasPremium = await has({ plan: 'premium' });

    const user = await clerkClient.users.getUser(userId);

    if (!hasPremium && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremium ? 'premium' : 'free';
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export
export { auth };
