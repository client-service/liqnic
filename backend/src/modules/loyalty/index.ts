import { Module } from "@medusajs/framework/utils"
import LoyaltyModuleService from "./services/loyalty.service"

export const LOYALTY_MODULE = "loyalty"

export default Module(LOYALTY_MODULE, {
  service: LoyaltyModuleService,
})