import { z } from "zod";

export const createRouteStopSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Stop name must be at least 2 characters")
    .max(100, "Stop name must not exceed 100 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Stop address must be at least 5 characters")
    .max(500, "Stop address must not exceed 500 characters"),

  latitude: z
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude")
    .optional(),

  longitude: z
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude")
    .optional(),

  sequence: z
    .number()
    .int("Sequence must be a whole number")
    .positive("Sequence must be greater than 0"),

  pickupTime: z
    .string()
    .trim()
    .optional(),

  dropTime: z
    .string()
    .trim()
    .optional(),
});

export const updateRouteStopSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Stop name must be at least 2 characters")
    .max(100, "Stop name must not exceed 100 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, "Stop address must be at least 5 characters")
    .max(500, "Stop address must not exceed 500 characters")
    .optional(),

  latitude: z
    .number()
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude")
    .optional(),

  longitude: z
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude")
    .optional(),

  sequence: z
    .number()
    .int("Sequence must be a whole number")
    .positive("Sequence must be greater than 0")
    .optional(),

  pickupTime: z
    .string()
    .trim()
    .optional(),

  dropTime: z
    .string()
    .trim()
    .optional(),
});