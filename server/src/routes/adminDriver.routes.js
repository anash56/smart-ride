import express from "express";

import {
  getAll,
  getById,
  updateVerification,
  updateDocumentStatus,
} from "../controllers/adminDriver.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getAll
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getById
);

router.patch(
  "/:id/verification",
  authenticate,
  authorize("ADMIN"),
  updateVerification
);

router.patch(
  "/:id/documents/:documentId/status",
  authenticate,
  authorize("ADMIN"),
  updateDocumentStatus
);

export default router;