/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { clerkClient } from '@clerk/express';
import OpenAI from 'openai';

// Internal Imports
import sql from '../configs/db.js';

// OpenAI Instance
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// Generate Article
const generateArticle = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    // if the user has reached their free usage limit
    if (plan !== 'premium' && free_usage >= 10) {
      return res.status(400).json({
        success: false,
        message:
          'You have reached your free usage limit. Please upgrade to a premium plan.',
      });
    }

    // Response from OpenAI
    const response = await AI.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: length,
      temperature: 0.7,
    });

    // Content from OpenAI
    const content = response.choices[0].message.content;

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article');`;

    // Update free usage
    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Article generated successfully.',
      content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const generateBlogTitle = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    // if the user has reached their free usage limit
    if (plan !== 'premium' && free_usage >= 10) {
      return res.status(400).json({
        success: false,
        message:
          'You have reached your free usage limit. Please upgrade to a premium plan.',
      });
    }

    // Response from OpenAI
    const response = await AI.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    // Content from OpenAI
    const content = response.choices[0].message.content;

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title');`;

    // Update free usage
    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Blog title generated successfully.',
      content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Export
export { generateArticle, generateBlogTitle };
