import { z } from "zod";

export const createAttendanceSchema = z.object({
  subscriptionId: z.string().uuid("Invalid subscription ID"),

  date: z.coerce.date({
    error: "Invalid attendance date",
  }),

  pickupStatus: z
    .enum(["PENDING", "COMPLETED", "MISSED"])
    .optional(),

  dropStatus: z
    .enum(["PENDING", "COMPLETED", "MISSED"])
    .optional(),

  notes: z
    .string()
    .trim()
    .max(500, "Notes must not exceed 500 characters")
    .optional(),
});

export const updateAttendanceSchema = z.object({
  pickupStatus: z
    .enum(["PENDING", "COMPLETED", "MISSED"])
    .optional(),

  dropStatus: z
    .enum(["PENDING", "COMPLETED", "MISSED"])
    .optional(),

  notes: z
    .string()
    .trim()
    .max(500, "Notes must not exceed 500 characters")
    .optional(),
});