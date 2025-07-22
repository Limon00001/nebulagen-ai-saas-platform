/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 Jul, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { clerkClient } from '@clerk/express';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import OpenAI from 'openai';
import pdf from 'pdf-parse/lib/pdf-parse.js';

// Internal Imports
import fs from 'fs';
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

// Generate Blog Title
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

// Generate Image
const generateImage = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // if the user has premium plan
    if (plan !== 'premium') {
      return res.status(400).json({
        success: false,
        message:
          'This feature is only available for premium users. Please upgrade to a premium plan.',
      });
    }

    // Form Data for image
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Response from ClipDrop
    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      },
    );

    // Image from ClipDrop
    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      'binary',
    ).toString('base64')}`;

    // Upload to Cloudinary and get secure url
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    });`;

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Image generated successfully.',
      content: secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Image Background
const removeImageBackground = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    // if the user has premium plan
    if (plan !== 'premium') {
      return res.status(400).json({
        success: false,
        message:
          'This feature is only available for premium users. Please upgrade to a premium plan.',
      });
    }

    // Image from Cloudinary and get secure url
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background',
        },
      ],
    });

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image');`;

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Image background removed successfully.',
      content: secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Image Object
const removeImageObject = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const { object } = req.body;
    const { image } = req.file;
    const plan = req.plan;

    // if the user has premium plan
    if (plan !== 'premium') {
      return res.status(400).json({
        success: false,
        message:
          'This feature is only available for premium users. Please upgrade to a premium plan.',
      });
    }

    // Upload to Cloudinary and get the public id
    const { public_id } = await cloudinary.uploader.upload(image.path);

    // Get image url
    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: 'image',
    });

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image');`;

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Object removed successfully.',
      content: imageUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Resume Review
const resumeReview = async (req, res) => {
  try {
    // Destructure Request
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // if the user has premium plan
    if (plan !== 'premium') {
      return res.status(400).json({
        success: false,
        message:
          'This feature is only available for premium users. Please upgrade to a premium plan.',
      });
    }

    // Check if resume is uploaded
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume.',
      });
    }

    // Check if resume is pdf
    if (resume.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF resume.',
      });
    }

    // Check if resume size is less than 5MB
    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Resume size should be less than 5MB.',
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. The resume is in the following format:\n\n${pdfData.text}`;

    // Response from OpenAI
    const response = await AI.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Content from OpenAI
    const content = response.choices[0].message.content;

    // Insert into database
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review');`;

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Object removed successfully.',
      content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Export
export {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
};
