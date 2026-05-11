import fs from "fs";
import path from "path";
import logger from "../../utils/logger.utils";

export const processForm = async (
  data: FormData,
  file: Express.Multer.File | undefined,
) => {
  if (!file) throw new Error("No photo provided");

  // 1. Define the destination directory
  const uploadDir = path.join(__dirname, "../uploads");
  logger.info(
    `Processing form for user , saving file to ${uploadDir}`,
  );
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

  logger.info(`Saving user  with file ${fileName}`);

  return {
    success: true,
    photoUrl: `/uploads/${fileName}`,
    data: data
  };
};
