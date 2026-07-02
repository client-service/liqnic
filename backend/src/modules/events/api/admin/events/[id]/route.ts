import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import EventModuleService from "../../../../services/event.service";
import { z } from "@medusajs/framework/zod";

// Zod schema for updating an event
const UpdateEventSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(1).optional(),
    image_url: z.string().nullable().optional(),
});

/**
 * Retrieves a specific event and its subscribers.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const eventService: EventModuleService = req.scope.resolve("eventModuleService");
    const { id } = req.params;

    const event = await eventService.retrieveEventWithSubscribers(id);
    res.status(200).json({ event });
}

/**
 * Updates an event's details.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const eventService: EventModuleService = req.scope.resolve("eventModuleService");
    const { id } = req.params;

    const parsedBody = UpdateEventSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ errors: parsedBody.error.issues });
    }

    const { data } = parsedBody;

    const event = await eventService.updateEvents({ id: id, ...{ data } });
    res.status(200).json({ event });
}


/**
 * Deletes an event.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
    const eventService: EventModuleService = req.scope.resolve("eventModuleService");
    const { id } = req.params;

    await eventService.deleteEvent(id);
    res.status(200).json({
        id,
        object: "event",
        deleted: true,
    });
}