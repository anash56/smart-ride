import { z } from "zod";

export const updateSubscriptionStatusSchema = z.object({
  status: z.enum([
    "ACTIVE",
    "PAUSED",
    "CANCELLED",
    "EXPIRED",
  ]),
});

export const subscriptionFilterSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "ACTIVE",
      "PAUSED",
      "CANCELLED",
      "EXPIRED",
    ])
    .optional(),
});