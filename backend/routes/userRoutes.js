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

router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyAdmin, getUserById);
router.put("/:id", verifyUser, updateUser); // cek di controller: user hanya bisa update sendiri
router.delete("/:id", verifyAdmin, deleteUser);

export default router;
