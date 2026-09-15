import { z } from "zod";

export const createRouteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Route name must be at least 3 characters")
    .max(100, "Route name must not exceed 100 characters"),

  origin: z
    .string()
    .trim()
    .min(3, "Origin must be at least 3 characters")
    .max(200, "Origin must not exceed 200 characters"),

  destination: z
    .string()
    .trim()
    .min(3, "Destination must be at least 3 characters")
    .max(200, "Destination must not exceed 200 characters"),

  distanceKm: z
    .number()
    .positive("Distance must be greater than 0")
    .optional(),

  estimatedDurationMinutes: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});

export const updateRouteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Route name must be at least 3 characters")
    .max(100, "Route name must not exceed 100 characters")
    .optional(),

  origin: z
    .string()
    .trim()
    .min(3, "Origin must be at least 3 characters")
    .max(200, "Origin must not exceed 200 characters")
    .optional(),

  destination: z
    .string()
    .trim()
    .min(3, "Destination must be at least 3 characters")
    .max(200, "Destination must not exceed 200 characters")
    .optional(),

  distanceKm: z
    .number()
    .positive("Distance must be greater than 0")
    .optional(),

  estimatedDurationMinutes: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});