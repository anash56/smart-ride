import express from "express";

import {
  create,
  complete,
} from "../controllers/payment.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("USER"),
  create
);

router.post(
  "/complete",
  authenticate,
  authorize("USER"),
  complete
);

export default router;