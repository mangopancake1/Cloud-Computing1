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
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://notes-fe0141-dot-c-13-451813.uc.r.appspot.com"
  // Tambahkan domain frontend produksi jika sudah deploy
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        console.error("CORS error:", origin); // Tambahkan log
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Mount route berdasarkan fungsi dan akses
app.use("/", authRoutes);           // Autentikasi user & admin
app.use("/", userRoutes);           // Manajemen user
app.use("/", concertRoutes);        // CRUD konser // CRUD kelas tempat duduk
app.use("/", ticketRoutes);         // Manajemen tiket pembelian

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
