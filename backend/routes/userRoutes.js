import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser, // tambahkan import createUser
} from "../controllers/userController.js";

import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/create-users", createUser); // register user (open/public)

router.put("/update-users/:id", verifyUser, updateUser);

router.get("/users", verifyAdmin, getUsers);
router.get("/users/:id", verifyAdmin, getUserById);
router.delete("/delete-users/:id", verifyAdmin, deleteUser);

export default router;
