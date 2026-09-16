import { z } from "zod";

export const createDriverSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),

  licenseNumber: z
    .string()
    .trim()
    .min(5, "License number must be at least 5 characters")
    .max(50, "License number must not exceed 50 characters"),

  licenseExpiry: z.coerce.date({
    error: "Invalid license expiry date",
  }),

  experienceYears: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience is too high")
    .optional(),
});

export const updateDriverSchema = z.object({
  licenseNumber: z
    .string()
    .trim()
    .min(5, "License number must be at least 5 characters")
    .max(50, "License number must not exceed 50 characters")
    .optional(),

  licenseExpiry: z.coerce.date({
    error: "Invalid license expiry date",
  }).optional(),

  experienceYears: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience is too high")
    .optional(),

  verificationStatus: z
    .enum(["PENDING", "VERIFIED", "REJECTED"])
    .optional(),
});