import fs from "fs";
import path from "path";
import logger from "../../utils/logger.utils";
import { FormData } from "./gp.model";

export const processForm = async (
  data: any,
  file: Express.Multer.File,
  aadharFiles: Express.Multer.File[],
) => {
  try {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ── Save visitor photo ────────────────────────────────────────────────────
    const photoFileName = `${Date.now()}-${file.originalname}`;
    const photoSavePath = path.join(uploadDir, photoFileName);
    fs.writeFileSync(photoSavePath, file.buffer);
    const photoUrl = `/uploads/${photoFileName}`;

    // ── Parse JSON-encoded fields sent from multipart FormData ─────────────
    let carryWith = data.carryWith;
    let visitArea = data.visitArea;
    let persons = data.persons;

    try {
      carryWith =
        typeof carryWith === "string" ? JSON.parse(carryWith) : carryWith;
      if (!Array.isArray(carryWith)) carryWith = [];
    } catch {
      carryWith = [];
    }

    try {
      visitArea =
        typeof visitArea === "string" ? JSON.parse(visitArea) : visitArea;
      if (!Array.isArray(visitArea)) visitArea = [];
    } catch {
      visitArea = [];
    }

    try {
      persons = typeof persons === "string" ? JSON.parse(persons) : persons;
      if (!Array.isArray(persons)) persons = [];
    } catch {
      persons = [];
    }

    // ── Save each person's aadhar file and attach URL to person record ──────
    const personsWithFileUrls = (persons as any[]).map(
      (person: any, index: number) => {
        const aadharFile = aadharFiles[index];
        if (aadharFile) {
          const aadharFileName = `aadhar-${Date.now()}-${index}-${aadharFile.originalname}`;
          const aadharSavePath = path.join(uploadDir, aadharFileName);
          fs.writeFileSync(aadharSavePath, aadharFile.buffer);
          return { ...person, aadharFileUrl: `/uploads/${aadharFileName}` };
        }
        return person;
      },
    );

    // ── Create DB record ───────────────────────────────────────────────────────
    const pass = await FormData.create({
      ...data,
      carryWith,
      visitArea,
      persons: personsWithFileUrls,
      noOfPerson: Number(data.noOfPerson) || 0,
      photoUrl,
    });

    logger.info(`Gate pass created: ${pass._id}`);

    return {
      success: true,
      photoUrl,
      data: pass,
    };
  } catch (err: any) {
    logger.error(`processForm error: ${err.message}`);
    throw new Error(err.message);
  }
};