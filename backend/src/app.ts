import express from "express";
import cors from "cors";
import {
  securityHeaders,
  sanitizeInput,
} from "./middleware/sanitize.middleware";
import { apiLimiter } from "./middleware/ratelimit.middleware";
import morgan from "morgan";
import logger from "./utils/logger.utils";
import  errorHandler  from "./middleware/errorHandler";
import authRoutes from "./features/auth/auth.routes";
import captureRoutes from "./features/gate_pass/gp.routes";

const app = express();

// 1. GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(securityHeaders);
app.use("/api", apiLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(sanitizeInput);
// Development logging

const stream = { write: (message: String) => logger.http(message.trim()) };

// 3. Apply Morgan WITH the stream option attached!
app.use(
  morgan(
    "[:method]|| :url ||Status::status ||ResponseTime: { :response-time ms }  ||Device: { :user-agent }",
    { stream: stream }, // This tells Morgan to use Winston!
  ),
);


// Implement CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Data sanitization against XSS


logger.info(`Routing requested`);

// 2. ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/capture", captureRoutes);

// 3. ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;
