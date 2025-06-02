import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 🔐 Register
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
      role: role || "user",
    });

    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔑 Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ msg: "Username atau password salah" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Username atau password salah" });
    }

    const userPlain = user.toJSON();
    const { password: _, refresh_token: __, ...userData } = userPlain;

    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax", // Ganti ke Lax agar bisa di localhost tanpa HTTPS
      secure: false,   // Ganti ke false agar bisa di localhost tanpa HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.status(200).json({
      accessToken, // frontend ambil dari sini
      user: userData,
      msg: "Login berhasil"
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🚪 Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.sendStatus(204);

    await User.update({ refresh_token: null }, { where: { id: user.id } });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
