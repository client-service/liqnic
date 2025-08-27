import { MedusaService } from "@medusajs/framework/utils"
import { Event } from "../models/event.model"
import { Subscriber } from "../models/subscriber.model"

// Define input types for clarity and type safety
type CreateEventInput = {
    name: string
    description: string
    image_url?: string
}

type UpdateEventInput = {
    name: string
    description?: string
    image_url?: string
}

type AddSubscriberInput = {
    name: string
    email: string
    event_id: string
}

/**
 * The main service for managing Events and Subscribers.
 */
class EventModuleService extends MedusaService({
    Event,
    Subscriber,
}) {
    // Note: The MedusaService factory automatically provides base methods like:
    // this.listEvent, this.retrieveEvent, this.createEvent, this.updateEvent, this.deleteEvent
    // this.listSubscriber, this.retrieveSubscriber, this.createSubscriber, etc.
    // We will wrap or extend them here for our specific module logic.

    /**
     * Creates a new event.
     * @param data - The event's details.
     * @returns The newly created event.
     */
    async createEvent(data: CreateEventInput) {
        return await this.createEvent(data)
    }

    /**
     * Retrieves a list of all events.
     * @returns An array of events.
     */
    async listAllEvents() {
        return await this.listEvents()
    }

    /**
     * Retrieves a specific event along with its list of subscribers.
     * @param eventId - The ID of the event to retrieve.
     * @returns The event with its subscribers.
     */
    async retrieveEventWithSubscribers(eventId: string) {
        return await this.retrieveEvent(eventId, {
            relations: ["subscribers"],
        })
    }

    /**
     * Updates an existing event's details.
     * @param eventId - The ID of the event to update.
     * @param data - The new details for the event.
     * @returns The updated event.
     */
    async updateEvent(eventId: string, data: UpdateEventInput) {
        return await this.updateEvent(eventId, data)
    }

    /**
     * Deletes an event from the database.
     * @param eventId - The ID of the event to delete.
     */
    async deleteEvent(eventId: string) {
        await this.deleteEvent(eventId)
    }

    /**
     * Adds a new subscriber to a specific event.
     * @param data - The subscriber's details, including the event_id.
     * @returns The newly created subscriber.
     */
    async addSubscriber(data: AddSubscriberInput) {
        return await this.createSubscribers(data)
    }

    /**
     * Lists all subscribers for a specific event.
     * @param eventId - The ID of the event.
     * @returns An array of subscribers for that event.
     */
    async listSubscribersByEvent(eventId: string) {
        return await this.listSubscribers({
            where: { event_id: eventId },
        })
    }

    /**
     * Removes a subscriber registration.
     * @param subscriberId - The ID of the subscriber to remove.
     */
    async removeSubscriber(subscriberId: string) {
        await this.deleteSubscribers(subscriberId)
    }
}

export default EventModuleService