import SeatClass from "../models/seatClassModel.js";
import Concert from "../models/concertModel.js";

// 📌 Tambah kelas kursi untuk konser tertentu (admin)
export const createSeatClass = async (req, res) => {
  try {
    const { concertId, className, price, capacity } = req.body;

    if (!concertId || !className || !price || !capacity) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const concert = await Concert.findByPk(concertId);
    if (!concert) {
      return res.status(404).json({ msg: "Konser tidak ditemukan" });
    }

    const seatClass = await SeatClass.create({
      concertId,
      className,
      price,
      capacity,
      remaining: capacity,
    });

    res.status(201).json({ msg: "Kelas kursi berhasil ditambahkan", data: seatClass });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil semua kelas kursi untuk konser tertentu
export const getSeatClassesByConcert = async (req, res) => {
  try {
    const { concertId } = req.params;

    const seatClasses = await SeatClass.findAll({
      where: { concertId },
    });

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

    const { className, price, capacity, remaining } = req.body;

    seatClass.className = className || seatClass.className;
    seatClass.price = price || seatClass.price;
    seatClass.capacity = capacity || seatClass.capacity;
    seatClass.remaining = remaining || seatClass.remaining;

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
