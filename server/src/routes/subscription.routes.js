import express from "express";

import {
  create,
  getMine,
} from "../controllers/subscription.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("USER"),
  create
);

router.get(
  "/me",
  authenticate,
  authorize("USER"),
  getMine
);

export default router;