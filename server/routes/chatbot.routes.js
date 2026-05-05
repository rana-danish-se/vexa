import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { createChatbot } from '../controllers/chatbot/chatbot.controller.js';

const router = express.Router();

router.post('/', requireAuth, createChatbot);

export default router;
