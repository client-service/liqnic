import { defineMiddlewares } from "@medusajs/framework";
import upload, { imageFileFilter } from "../middlewares/multer.middleware";
import { memoryStorage } from "multer";
import { queryGuardrailMiddleware } from '../middlewares/query-guardrail.middleware';

export default defineMiddlewares({
    routes: [
        // --- STOREFRONT GUARDRAILS ---
        {
            // Apply guardrails to ALL public storefront routes
            matcher: "/store/*",
            method: "ALL", 
            middlewares: [queryGuardrailMiddleware],
        },
        
        // --- ADMIN MULTIPART UPLOADS ---
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
                }).single("image_url") as any, // multer types use express@4, Medusa uses express@5
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
                }).single("image_url") as any, // multer types use express@4, Medusa uses express@5
            ],
        },
    ],
});
