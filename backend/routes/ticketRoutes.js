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

router.get("/:id", verifyUser, getTicketsByUser,); 
router.post("/", verifyUser, createTicket); 

router.put("/:id", verifyAdmin, getTicketById); 
router.get("/", verifyAdmin, getAllTickets); // admin lihat semua tiket

export default router;
