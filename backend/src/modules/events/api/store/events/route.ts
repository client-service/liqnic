import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import EventModuleService from "../../../services/event.service";

/**
 * Lists all events for the storefront.
 * @param req - MedusaRequest
 * @param res - MedusaResponse
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const eventService: EventModuleService = req.scope.resolve("eventModuleService");
  const events = await eventService.listEvents();
  res.status(200).json({ events });
}