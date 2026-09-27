import { z } from "zod";

export const updateVehicleStatusSchema = z.object({
  status: z.enum([
    "ACTIVE",
    "INACTIVE",
    "MAINTENANCE",
  ]),
});