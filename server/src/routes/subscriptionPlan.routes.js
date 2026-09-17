import express from "express";

import {
  create,
  getAll,
  getActive,
  getOne,
  update,
  remove,
} from "../controllers/subscriptionPlan.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  create
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getAll
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  remove
);

// Admin + User
router.get(
  "/active",
  authenticate,
  authorize("ADMIN", "USER"),
  getActive
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "USER"),
  getOne
);

export default router;