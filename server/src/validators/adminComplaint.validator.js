import { z } from "zod";

export const complaintFilterSchema = z.object({
  status: z
    .enum([
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED",
    ])
    .optional(),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum([
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
  ]),
});