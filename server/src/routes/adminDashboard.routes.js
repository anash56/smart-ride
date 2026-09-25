import express from "express";

import { getDashboard } from "../controllers/adminDashboard.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);

export default router;