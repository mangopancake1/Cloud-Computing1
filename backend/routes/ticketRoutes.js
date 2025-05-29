import express from "express";
import {
    createTicket,
    getTicketsByUser,
    getAllTickets,
    getTicketById,
} from "../controllers/ticketController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllTickets); // admin lihat semua tiket
router.get("/:id", verifyUser, getTicketsByUser,); // user lihat tiket sendiri (cek di controller)
router.post("/", verifyUser, createTicket); // user pesan tiket
router.put("/:id", verifyAdmin, getTicketById); // admin update tiket

export default router;
