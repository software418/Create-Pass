// import { Router } from 'express';
// import multer from 'multer';
// import { handleFormSubmission } from '../capture/formcontroller';

// const router = Router();

// // Configure Multer for Memory Storage (provides file.buffer)
// const upload = multer({ 
//   storage: multer.memoryStorage(),
//   // limits: { fileSize: 10 * 1024 * 1024 } // Optional: 5MB limit
// });

// // Use 'photo' as the field name to match your frontend
// router.post('/upload', upload.single('photo'), handleFormSubmission);

// export default router;
import { Router } from "express";
import multer from "multer";
import { handleFormSubmission } from "../gate_pass/gp.controller";

const router = Router();

// Memory storage — file.buffer is available in the controller/service
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

/**
 * Accept:
 *   - "photo"         — the single webcam capture (required)
 *   - "aadharFile_N"  — one file per person (optional, up to 20 persons)
 *
 * Using upload.fields() so multer collects all files into req.files (an object),
 * while req.body still carries every text/JSON field.
 */
router.post(
  "/upload",
  upload.fields([
    { name: "photo", maxCount: 1 },
    ...Array.from({ length: 20 }, (_, i) => ({ name: `aadharFile_${i}`, maxCount: 1 })),
  ]),
  handleFormSubmission
);

export default router;