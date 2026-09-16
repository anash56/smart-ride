import { z } from "zod";

export const createRouteAssignmentSchema = z.object({
  driverId: z.string().uuid("Invalid driver ID"),

  vehicleId: z.string().uuid("Invalid vehicle ID"),

  routeId: z.string().uuid("Invalid route ID"),

  scheduleId: z.string().uuid("Invalid schedule ID"),

  startDate: z.coerce.date({
    error: "Invalid start date",
  }),

  endDate: z.coerce
    .date({
      error: "Invalid end date",
    })
    .optional(),

  status: z
    .enum(["ACTIVE", "INACTIVE", "COMPLETED"])
    .optional(),
});

export const updateRouteAssignmentSchema = z.object({
  startDate: z.coerce
    .date({
      error: "Invalid start date",
    })
    .optional(),

  endDate: z.coerce
    .date({
      error: "Invalid end date",
    })
    .optional(),

  status: z
    .enum(["ACTIVE", "INACTIVE", "COMPLETED"])
    .optional(),
});