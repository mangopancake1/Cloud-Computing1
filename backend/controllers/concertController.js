import Concert from "../models/concertModel.js";

// 📌 Buat konser baru (admin)
export const createConcert = async (req, res) => {
  try {
    const { concertName, venue, date, description } = req.body;

    if (!concertName || !venue || !date) {
      return res.status(400).json({ msg: "Nama konser, venue, dan tanggal wajib diisi" });
    }

    // Pastikan tanggal dalam format YYYY-MM-DD
    const formattedDate = new Date(date);

    const newConcert = await Concert.create({
      concertName,
      venue,
      date: formattedDate,
      description,
    });

    res.status(201).json({ msg: "Konser berhasil ditambahkan", data: newConcert });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil semua konser
export const getConcerts = async (req, res) => {
  try {
    const concerts = await Concert.findAll({ order: [["date", "ASC"]] });
    res.status(200).json(concerts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil konser berdasarkan ID
export const getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findByPk(req.params.id);
    if (!concert) return res.status(404).json({ msg: "Konser tidak ditemukan" });
    res.status(200).json(concert);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Update konser berdasarkan ID (admin)
export const updateConcert = async (req, res) => {
  try {
    const { concertName, venue, date, description } = req.body;

    const concert = await Concert.findByPk(req.params.id);
    if (!concert) return res.status(404).json({ msg: "Konser tidak ditemukan" });

    concert.concertName = concertName || concert.concertName;
    concert.venue = venue || concert.venue;
    concert.date = date || concert.date;
    concert.description = description || concert.description;

    await concert.save();

    res.status(200).json({ msg: "Konser berhasil diperbarui", data: concert });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Hapus konser
export const deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findByPk(req.params.id);
    if (!concert) return res.status(404).json({ msg: "Konser tidak ditemukan" });

    await concert.destroy();
    res.status(200).json({ msg: "Konser berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
