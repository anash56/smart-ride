import express from "express";

import { create, getMine, getOne, update, remove,} from "../controllers/address.controller.js";
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
  "/",
  authenticate,
  authorize("USER"),
  getMine
);

router.get(
  "/:id",
  authenticate,
  authorize("USER"),
  getOne
);

router.patch(
  "/:id",
  authenticate,
  authorize("USER"),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("USER"),
  remove
);

export default router;