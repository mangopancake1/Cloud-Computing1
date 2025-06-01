import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { db } from "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import concertRoutes from "./routes/concertRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5010;

// Konfigurasi CORS - sesuaikan origin frontend jika ada
const allowedOrigins = [
  "",    // Contoh frontend lokal
  "", // Sesuaikan dengan domain frontend produksi
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Mount route berdasarkan fungsi dan akses
app.use("/api/auth", authRoutes);           // Autentikasi user & admin
app.use("/api/users", userRoutes);           // Manajemen user
app.use("/api/concerts", concertRoutes);     // CRUD konser // CRUD kelas tempat duduk
app.use("/api/tickets", ticketRoutes);       // Manajemen tiket pembelian

// Sinkronisasi database dan start server
(async () => {
  try {
    await db.sync({ alter: true }); // alter: true untuk update tabel tanpa drop (opsional)
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
})();
