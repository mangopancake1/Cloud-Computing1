import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Ambil semua user (admin only)
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: { exclude: ["password", "refresh_token"] }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Ambil user berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "refresh_token"] }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Registrasi user baru
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    // Cari username/email tanpa case sensitive
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    // Validasi role hanya boleh 'user' atau 'admin'
    let userRole = "user";
    if (role && (role === "user" || role === "admin")) {
      userRole = role;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: userRole
    });

    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.error("Register error:", error); // Tambahkan log
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Perbarui data user
export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const updatedData = {
      username,
      email
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const result = await User.update(updatedData, {
      where: { id: req.params.id }
    });

    if (result[0] === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan atau tidak ada perubahan" });
    }

    res.status(200).json({ msg: "Data user berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Hapus user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Login user
export const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ msg: "Username atau password salah" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ msg: "Username atau password salah" });

    const { password: _, refresh_token: __, ...safeUser } = user.toJSON();

    const accessToken = jwt.sign(safeUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m"
    });

    const refreshToken = jwt.sign(safeUser, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d"
    });

    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      msg: "Login berhasil",
      user: safeUser,
      accessToken
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Logout user
export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findOne({ where: { refresh_token: refreshToken } });
  if (!user) return res.sendStatus(204);

  await User.update({ refresh_token: null }, { where: { id: user.id } });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
