import { Router, Request, Response } from 'express';
import multer from 'multer';
import { processForm } from '../capture/formservices';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/submit', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    // req.file is available because of upload.single('photo')
    const result = await processForm(req.body, req.file);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;