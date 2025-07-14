import express from 'express';
import { authenticateToken } from '../midlewares/authMiddleware.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken);

export default router