import express from 'express';
import { subscribe } from '../controllers/newsletterController.js';

const router = express.Router();

// Route to handle POST requests for newsletter subscriptions
router.post('/subscribe', subscribe);

export default router;
