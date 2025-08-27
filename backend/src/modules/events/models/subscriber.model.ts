import { model } from "@medusajs/framework/utils"
import { Event } from "./event.model"

export const Subscriber = model.define("subscriber", {
  id: model.id().primaryKey(),
  name: model.text(),
  email: model.text(),
  event: model.belongsTo(() => Event, { mappedBy: "subscribers", foreignKeyName: "event_id" }),
})