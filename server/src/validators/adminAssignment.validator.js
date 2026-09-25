import { z } from "zod";

export const updateAssignmentStatusSchema = z.object({
  status: z.enum([
    "ACTIVE",
    "INACTIVE",
    "COMPLETED",
  ]),
});