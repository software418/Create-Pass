import express from 'express';
import cors from 'cors';
import { securityHeaders, sanitizeInput } from './middleware/sanitize.middleware';
import { apiLimiter } from './middleware/ratelimit.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './features/auth/auth.routes';
import captureRoutes from './features/capture/formRoutes';

const app = express();

// 1. GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(securityHeaders);


// Development logging
app.use(morganMiddleware);

// Limit requests from same API
app.use('/api', apiLimiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Implement CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Data sanitization against XSS
app.use(sanitizeInput);

// 2. ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/capture', captureRoutes);




// 3. ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;
