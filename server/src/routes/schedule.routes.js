import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/schedule.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router({ mergeParams: true });

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

router.get(
  "/:scheduleId",
  authenticate,
  authorize("ADMIN"),
  getOne
);

router.patch(
  "/:scheduleId",
  authenticate,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:scheduleId",
  authenticate,
  authorize("ADMIN"),
  remove
);

export default router;