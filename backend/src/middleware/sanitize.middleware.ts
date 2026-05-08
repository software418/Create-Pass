import helmet from 'helmet';

// Custom sanitization if needed can be placed here, though express-mongo-sanitize
// is usually applied globally in app.js. 

export const securityHeaders = helmet();

// Basic custom xss sanitizer (for demonstration, recommend xss-clean package for real app)
import { Request, Response, NextFunction } from 'express';

const cleanObject = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return;
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/<[^>]*>?/gm, ''); // simple strip tags
    } else if (typeof obj[key] === 'object') {
      cleanObject(obj[key]);
    }
  }
};

export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  cleanObject(req.body);
  cleanObject(req.query);
  cleanObject(req.params);
  next();
};
