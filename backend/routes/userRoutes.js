import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();


router.put("/:id", verifyUser, updateUser); 

router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyAdmin, getUserById);
router.delete("/:id", verifyAdmin, deleteUser);

export default router;
