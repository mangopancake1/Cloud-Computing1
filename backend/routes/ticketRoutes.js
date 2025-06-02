import express from "express";
import {
    createTicket,
    getTicketsByUser,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from "../controllers/ticketController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/tickets/:id", verifyUser, getTicketsByUser);
router.post("/create-ticket", verifyUser, createTicket);

router.put("/tickets/:id", verifyUser, updateTicket);
router.delete("/delete-ticket/:id", verifyUser, deleteTicket);
router.get("/tickets", verifyAdmin, getAllTickets);
router.get("/admin/tickets/:id", verifyAdmin, getTicketById);

export default router;
