import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/routeStop.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router({mergeParams: true});

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
  "/:stopId",
  authenticate,
  authorize("ADMIN"),
  getOne
);

router.patch(
  "/:stopId",
  authenticate,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:stopId",
  authenticate,
  authorize("ADMIN"),
  remove
);

export default router;