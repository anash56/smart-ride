import { z } from "zod";

export const createSubscriptionPlanSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Plan name must be at least 3 characters")
    .max(100, "Plan name must not exceed 100 characters"),

  durationMonths: z
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 month")
    .max(12, "Duration cannot exceed 12 months"),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .max(100000, "Price is too high"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  isActive: z.boolean().optional(),
});

export const updateSubscriptionPlanSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Plan name must be at least 3 characters")
    .max(100, "Plan name must not exceed 100 characters")
    .optional(),

  durationMonths: z
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 month")
    .max(12, "Duration cannot exceed 12 months")
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .max(100000, "Price is too high")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  isActive: z.boolean().optional(),
});