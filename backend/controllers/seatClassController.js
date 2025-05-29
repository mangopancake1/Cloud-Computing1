import SeatClass from "../models/seatClassModel.js";

// 📌 Tambah kelas kursi (admin)
export const createSeatClass = async (req, res) => {
  try {
    const { className, price } = req.body;

    if (!className || !price) {
      return res.status(400).json({ msg: "Nama kelas dan harga wajib diisi" });
    }

    const seatClass = await SeatClass.create({
      className,
      price,
    });

    res.status(201).json({ msg: "Kelas kursi berhasil ditambahkan", data: seatClass });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil semua kelas kursi
export const getSeatClasses = async (req, res) => {
  try {
    const seatClasses = await SeatClass.findAll();
    res.status(200).json(seatClasses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil satu kelas kursi berdasarkan ID
export const getSeatClassById = async (req, res) => {
  try {
    const seatClass = await SeatClass.findByPk(req.params.id);
    if (!seatClass) return res.status(404).json({ msg: "Kelas kursi tidak ditemukan" });

    res.status(200).json(seatClass);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Update kelas kursi berdasarkan ID
export const updateSeatClass = async (req, res) => {
  try {
    const seatClass = await SeatClass.findByPk(req.params.id);
    if (!seatClass) return res.status(404).json({ msg: "Kelas kursi tidak ditemukan" });

    const { className, price } = req.body;

    seatClass.className = className || seatClass.className;
    seatClass.price = price || seatClass.price;

    await seatClass.save();

    res.status(200).json({ msg: "Kelas kursi berhasil diupdate", data: seatClass });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Hapus kelas kursi
export const deleteSeatClass = async (req, res) => {
  try {
    const seatClass = await SeatClass.findByPk(req.params.id);
    if (!seatClass) return res.status(404).json({ msg: "Kelas kursi tidak ditemukan" });

    await seatClass.destroy();
    res.status(200).json({ msg: "Kelas kursi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
