import Note from "../models/NoteModel.js";

// Get All Notes
export const getNotes = async (req, res) => {
  try {
    const note = await Note.findAll();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Buat note baru yang terkait user login
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title dan content wajib diisi" });
    }

    const newNote = await Note.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Note berhasil dibuat", data: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update note milik user
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!note) return res.status(404).json({ message: "Note tidak ditemukan atau bukan milik Anda" });

    const { title, content } = req.body;
    await note.update({ title, content });

    res.json({ message: "Note berhasil diperbarui", data: note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Hapus note milik user
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!note) return res.status(404).json({ message: "Note tidak ditemukan atau bukan milik Anda" });

    await note.destroy();
    res.json({ message: "Note berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
