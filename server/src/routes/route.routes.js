import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/route.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

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
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getOne
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

export default router;