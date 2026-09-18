import { z } from "zod";

export const createPaymentSchema = z.object({
  subscriptionId: z.string().uuid("Invalid subscription ID"),

  paymentMethod: z
    .string()
    .trim()
    .min(2, "Payment method is required")
    .max(50, "Payment method is too long"),
});