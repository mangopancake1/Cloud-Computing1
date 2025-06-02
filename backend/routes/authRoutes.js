import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/create-users", register);  // open
router.post("/login", login); // open
router.delete("/logout", verifyUser, logout); // user harus login

export default router;
