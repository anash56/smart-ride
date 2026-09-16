import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const daysOfWeekRegex =
  /^(MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))*$/;

export const createScheduleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Schedule name must be at least 3 characters")
    .max(100, "Schedule name must not exceed 100 characters"),

  startTime: z
    .string()
    .trim()
    .regex(
      timeRegex,
      "Start time must be in HH:MM format"
    ),

  endTime: z
    .string()
    .trim()
    .regex(
      timeRegex,
      "End time must be in HH:MM format"
    ),

  daysOfWeek: z
    .string()
    .trim()
    .regex(
      daysOfWeekRegex,
      "Days must use format like MON,TUE,WED"
    ),

  isActive: z
    .boolean()
    .optional(),
});

export const updateScheduleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Schedule name must be at least 3 characters")
    .max(100, "Schedule name must not exceed 100 characters")
    .optional(),

  startTime: z
    .string()
    .trim()
    .regex(
      timeRegex,
      "Start time must be in HH:MM format"
    )
    .optional(),

  endTime: z
    .string()
    .trim()
    .regex(
      timeRegex,
      "End time must be in HH:MM format"
    )
    .optional(),

  daysOfWeek: z
    .string()
    .trim()
    .regex(
      daysOfWeekRegex,
      "Days must use format like MON,TUE,WED"
    )
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});