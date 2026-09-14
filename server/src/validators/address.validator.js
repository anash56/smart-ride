import { z } from "zod";

export const createAddressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Label must be at least 2 characters")
    .max(50, "Label must not exceed 50 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must not exceed 500 characters"),

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

  type: z.enum(["PICKUP", "DROP", "OTHER"]),
});

export const updateAddressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Label must be at least 2 characters")
    .max(50, "Label must not exceed 50 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must not exceed 500 characters")
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

  type: z
    .enum(["PICKUP", "DROP", "OTHER"])
    .optional(),
});