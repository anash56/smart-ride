import { z } from "zod";

export const createSubscriptionSchema = z.object({
  planId: z.string().uuid("Invalid plan ID"),

  scheduleId: z.string().uuid("Invalid schedule ID"),

  pickupAddressId: z.string().uuid("Invalid pickup address ID"),

  dropAddressId: z.string().uuid("Invalid drop address ID"),

  startDate: z.coerce.date({
    error: "Invalid start date",
  }),
});