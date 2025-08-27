
import { Module } from "@medusajs/framework/utils"
import EventModuleService from "./services/event.service"

export const EVENTS_MODULE = "events";

export default Module(EVENTS_MODULE, {
  service: EventModuleService,
})
