import express from "express";
import { getDashboard } from "../controllers/driverDashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("DRIVER"),
  getDashboard
);

export default router;