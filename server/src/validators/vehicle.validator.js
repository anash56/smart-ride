import { z } from "zod";

export const createVehicleSchema = z.object({
  registrationNumber: z
    .string()
    .trim()
    .min(4, "Registration number must be at least 4 characters")
    .max(20, "Registration number must not exceed 20 characters"),

  model: z
    .string()
    .trim()
    .min(2, "Vehicle model must be at least 2 characters")
    .max(100, "Vehicle model must not exceed 100 characters"),

  vehicleType: z.enum([
    "SEDAN",
    "SUV",
    "HATCHBACK",
    "VAN",
    "OTHER",
  ]),

  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1")
    .max(100, "Capacity is too high"),
});

export const updateVehicleSchema = z.object({
  registrationNumber: z
    .string()
    .trim()
    .min(4, "Registration number must be at least 4 characters")
    .max(20, "Registration number must not exceed 20 characters")
    .optional(),

  model: z
    .string()
    .trim()
    .min(2, "Vehicle model must be at least 2 characters")
    .max(100, "Vehicle model must not exceed 100 characters")
    .optional(),

  vehicleType: z
    .enum([
      "SEDAN",
      "SUV",
      "HATCHBACK",
      "VAN",
      "OTHER",
    ])
    .optional(),

  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1")
    .max(100, "Capacity is too high")
    .optional(),

  status: z
    .enum([
      "ACTIVE",
      "MAINTENANCE",
      "INACTIVE",
    ])
    .optional(),
});