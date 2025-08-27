import { model } from "@medusajs/framework/utils"
import { Subscriber } from "./subscriber.model"

export const Event = model.define("event", {
  id: model.id().primaryKey(),
  name: model.text(),
  description: model.text(),
  image_url: model.text().nullable(),
  subscribers: model.hasMany(() => Subscriber, { mappedBy: "event" }),
})