import { MedusaRequest } from "@medusajs/framework";
import multer from "multer";

const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

/**
 * A file filter to allow only image files.
 * Rejects files with mimetypes that don't start with 'image/'.
 */
export const imageFileFilter = (
  req: MedusaRequest,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  // Check if the file's mimetype starts with 'image/'
  if (allowedImageFormats.includes(file.mimetype)) {
    // Accept the file
    callback(null, true);
  } else {
    // Reject the file
    callback(new Error("Only image files are allowed!"));
  }
};

/**
 * @param
 * Optional multer.Options
 * @default 
 * {storage: multer.memoryStorage()}
 * Initializes multer with memory storage.
 * This configuration holds the file in a buffer in memory,
 * which is perfect for passing it to Medusa's file service workflows.
 */
const upload = (options?: multer.Options) => multer(options ?? {
  storage: multer.memoryStorage(),
});

export default upload;