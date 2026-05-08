import fs from 'fs';
import path from 'path';

export const processForm = async (data: FormData, file: Express.Multer.File | undefined) => {
  if (!file) throw new Error('No photo provided');

  // 1. Define the destination directory
  const uploadDir = path.join(__dirname, '../uploads');
  console.log(`Processing form for user ${data.get('username')}, saving file to ${uploadDir}`);
  // 2. Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 3. Define the final path
  // Using Date.now() to prevent filename collisions
  const fileName = `${Date.now()}-${file.originalname}`;
  const savePath = path.join(uploadDir, fileName);

  // 4. Move the file from the temp path to the uploads folder
  // Note: If you are using multer with diskStorage, the file is already saved.
  // If you are using memoryStorage, use fs.writeFileSync:
  fs.writeFileSync(savePath, file.buffer);

  console.log(`Saving user ${data.get('username')} with file ${fileName}`);
  
  return {
    success: true,
    photoUrl: `/uploads/${fileName}`
  };
};