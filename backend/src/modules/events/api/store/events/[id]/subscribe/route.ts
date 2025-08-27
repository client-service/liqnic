import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import EventModuleService from "../../../../../services/event.service";
import { z } from "zod";

// Zod schema for validating a new subscriber
const SubscribeEventSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

/**
 * Registers a customer for a specific event.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const eventService: EventModuleService = req.scope.resolve("eventModuleService");
  const { id } = req.params;

  const parsedBody = SubscribeEventSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ errors: parsedBody.error.issues });
  }

  const subscriberData = {
    ...parsedBody.data,
    event_id: id,
  };

  const subscriber = await eventService.addSubscriber(subscriberData);
  res.status(201).json({ subscriber });
}