import express from "express";

import {
  getAll,
  updateStatus,
} from "../controllers/adminSubscription.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getAll
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  updateStatus
);

export default router;