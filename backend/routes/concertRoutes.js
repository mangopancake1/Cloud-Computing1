import express from "express";
import {
  getConcerts,
  getConcertById,
  createConcert,
  updateConcert,
  deleteConcert,
} from "../controllers/concertController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyUser, getConcerts);
router.get("/:id", verifyUser, getConcertById);
router.post("/", verifyAdmin, createConcert);
router.put("/:id", verifyAdmin, updateConcert);
router.delete("/:id", verifyAdmin, deleteConcert);

export default router;
