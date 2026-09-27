import { z } from "zod";

export const updateDriverVerificationSchema = z.object({
  status: z.enum([
    "VERIFIED",
    "REJECTED",
  ]),
});

export const updateDriverDocumentStatusSchema = z.object({
  status: z.enum([
    "VERIFIED",
    "REJECTED",
  ]),
});