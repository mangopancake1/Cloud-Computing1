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

router.get("/concerts", verifyUser, getConcerts); // user & admin
router.get("/concerts/:id", verifyUser, getConcertById);

router.post("/create-concert", verifyAdmin, createConcert); // hanya admin
router.put("/update-concert/:id", verifyAdmin, updateConcert);
router.delete("/delete-concert/:id", verifyAdmin, deleteConcert);

export default router;
