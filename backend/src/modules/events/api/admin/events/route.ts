import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows";
import EventModuleService from "../../../services/event.service";
import { z } from "zod";

// Zod schema for validating the text fields when creating an event
const CreateEventSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(1),
});

/**
 * Lists all events.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const eventService: EventModuleService = req.scope.resolve("eventModuleService");
    const events = await eventService.listEvents();
    res.status(200).json({ events });
}

/**
 * Creates a new event, handling an optional image upload.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const eventService: EventModuleService = req.scope.resolve("eventModuleService");

    const parsedBody = CreateEventSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ errors: parsedBody.error.issues });
    }

    let imageUrl: string | undefined = undefined;

    // If a file was included, process it using the workflow
    if (req.file) {
        const file = req.file as Express.Multer.File;
        const { result } = await uploadFilesWorkflow(req.scope).run({
            input: {
                files: [{
                    filename: file.originalname,
                    mimeType: file.mimetype,
                    content: file.buffer.toString("binary"),
                    access: 'public'
                }],
            },
        });
        imageUrl = result[0]?.url;
    }

    const eventData = {
        ...parsedBody.data,
        image_url: imageUrl,
    };

    const event = await eventService.createEvent(eventData);
    res.status(201).json({ event });
}