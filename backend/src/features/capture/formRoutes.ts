import { Router, Request, Response } from 'express';
import { upload } from '../../middleware/upload';
import { processForm } from './formservices';
import logger from '../../utils/logger.utils';
  
const router = Router();

router.post('/upload', upload.single('photo'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
 const response = await processForm(req.body, req.file);
  // The file is already saved to disk by multer at this point.
  // Access data:
  const filename = req.file.filename;// Text field from FormData
 logger.info(`responce: ${response} recived data`)
  res.json({
    message: 'Upload successful',
    file: filename,
    data: response
  });
});
export default router;