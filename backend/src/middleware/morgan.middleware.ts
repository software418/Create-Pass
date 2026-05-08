import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger.utils';

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
