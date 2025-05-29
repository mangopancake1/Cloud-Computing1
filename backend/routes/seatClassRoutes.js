import express from "express";
import {
  getSeatClasses,
  getSeatClassById,
  createSeatClass,
  updateSeatClass,
  deleteSeatClass,
} from "../controllers/seatClassController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyUser, getSeatClasses);
router.get("/:id", verifyUser, getSeatClassById);


router.post("/", verifyAdmin, createSeatClass);
router.put("/:id", verifyAdmin, updateSeatClass);
router.delete("/:id", verifyAdmin, deleteSeatClass);

export default router;
