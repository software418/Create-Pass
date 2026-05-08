import env from './config/env';
import app from './app';
import express from 'express';
import path from 'path';
// import { connectDB } from './config/db';
import logger from './utils/logger.utils';

process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// connectDB();

const port = env.PORT || 5000;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
  console.log(`App running on port ${port}...`);
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

process.on('unhandledRejection', (err: any) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
