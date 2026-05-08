import { Router, Request, Response } from 'express';
import { upload } from '../../middleware/upload';

const router = Router();

router.post('/upload', upload.single('photo'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // The file is already saved to disk by multer at this point.
  // Access data:
  const filename = req.file.filename;
  const username = req.body.username; // Text field from FormData

  res.json({
    message: 'Upload successful',
    file: filename,
    username: username
  });
});
export default router;