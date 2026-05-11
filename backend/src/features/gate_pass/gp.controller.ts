import { Request, Response } from "express";
import { processForm } from "../gate_pass/gp.service";
import logger from "../../utils/logger.utils";

export const handleFormSubmission = async (req: Request, res: Response) => {
  try {
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({
        status: "error",
        message: "Expected multipart/form-data. Check your frontend headers.",
      });
    }

    // When upload.fields() is used, req.files is a dictionary, not a single file
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const photoFiles = files?.["photo"];
    if (!photoFiles || photoFiles.length === 0) {
      return res.status(400).json({ status: "error", message: "No photo uploaded." });
    }

    const photo = photoFiles[0];

    // Collect aadhar files in order: aadharFile_0, aadharFile_1, …
    const aadharFiles: Express.Multer.File[] = [];
    let i = 0;
    while (files?.[`aadharFile_${i}`]) {
      aadharFiles.push(files[`aadharFile_${i}`][0]);
      i++;
    }

    logger.debug(`Content-Type: ${contentType}`);
    logger.debug(`Photo: ${photo.originalname} (${photo.size} bytes)`);
    logger.debug(`Aadhar files received: ${aadharFiles.length}`);
    logger.debug(`Body keys: ${Object.keys(req.body).join(", ")}`);

    const result = await processForm(req.body, photo, aadharFiles);

    return res.status(201).json(result);
  } catch (error: any) {
    logger.error(`Form submission failed: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};