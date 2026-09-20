import express from "express";

import { create,update,getAll} from "../controllers/attendance.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("DRIVER"),
  create
);

router.patch(
  "/:id",
  authenticate,
  authorize("DRIVER"),
  update
);

router.get(
  "/",
  authenticate,
  authorize("DRIVER"),
  getAll
);

export default router;