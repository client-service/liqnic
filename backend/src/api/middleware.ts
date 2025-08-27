import { defineMiddlewares } from "@medusajs/framework";
import upload, { imageFileFilter } from "../middlewares/multer.middleware";
import { memoryStorage } from "multer";

export default defineMiddlewares({
    routes: [
        {
            // Apply this middleware to both create and update event routes
            method: ["POST"],
            matcher: "/admin/events",
            middlewares: [
                // Initialize multer with the image file filter
                upload({
                    storage: memoryStorage(),
                    fileFilter: imageFileFilter,
                    limits: {
                        fileSize: 5 * 1024 * 1024, // Optional: 5MB file size limit
                    },
                }).single("image_url"), // Expect a single file in the 'image_url' field
            ],
        },
        {
            // Apply this middleware to both create and update event routes
            method: ["POST"],
            matcher: "/admin/events/:id",
            middlewares: [
                // Initialize multer with the image file filter
                upload({
                    storage: memoryStorage(),
                    fileFilter: imageFileFilter,
                    limits: {
                        fileSize: 5 * 1024 * 1024, // Optional: 5MB file size limit
                    },
                }).single("image_url"), // Expect a single file in the 'image_url' field
            ],
        },
    ],
});