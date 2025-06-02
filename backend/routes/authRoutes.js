import express from "express";
import { login, logout } from "../controllers/authController.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

// router.post("/create-users", register);  // Hapus ini, sudah di userRoutes
router.post("/login", login); // open
router.get("/token", refreshToken); // route untuk refresh token
router.delete("/logout", verifyUser, logout); // user harus login

export default router;
