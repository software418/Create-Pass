import express from 'express';
import * as authController from './auth.controller';
import { validate } from '../../middleware/validation.middleware';
import { registerSchema, loginSchema } from './auth.schema';
import { protect } from '../../middleware/auth.middleware';
import { authLimiter } from '../../middleware/ratelimit.middleware';

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

export default router;
