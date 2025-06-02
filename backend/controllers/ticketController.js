import Ticket from "../models/ticketModel.js";
import Concert from "../models/concertModel.js";
import User from "../models/userModel.js";

// 📌 Buat pembelian tiket (oleh user)
export const createTicket = async (req, res) => {
  try {
    const {
      concertId,
      seatName,
      quantity,
      buyerName,
      buyerEmail,
      buyerGender
    } = req.body;

    const userId = req.user.id;

    if (!concertId || !seatName || !quantity || !buyerName || !buyerEmail || !buyerGender) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    // Ambil harga concert dari DB
    const concert = await Concert.findByPk(concertId);
    if (!concert) return res.status(404).json({ msg: "Konser tidak ditemukan" });

    let seatMultiplier = 1;
    if (seatName === "diamond") seatMultiplier = 3;
    else if (seatName === "gold") seatMultiplier = 2;
    else if (seatName === "silver") seatMultiplier = 1;
    else return res.status(400).json({ msg: "Pilihan seat tidak valid" });

    const totalPrice = concert.price * quantity * seatMultiplier;

    const ticket = await Ticket.create({
      userId,
      concertId,
      seatName,
      quantity,
      totalPrice,
      buyerName,
      buyerEmail,
      buyerGender
    });

    res.status(201).json({
      msg: "Tiket berhasil dipesan",
      data: {
        ticketId: ticket.id,
        concertId,
        seatName,
        quantity,
        totalPrice,
        buyerName,
        buyerEmail,
        buyerGender
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Lihat tiket user login
export const getTicketsByUser = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: SeatClass,
          include: [Concert]
        }
      ]
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Admin melihat semua tiket
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: User, attributes: ["username", "email"] },
        {
          model: SeatClass,
          include: [Concert]
        }
      ]
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 Ambil tiket berdasarkan ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username", "email"] },
        {
          model: SeatClass,
          include: [Concert]
        }
      ]
    });

    if (!ticket) return res.status(404).json({ msg: "Tiket tidak ditemukan" });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update ticket
export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Tiket tidak ditemukan" });
    await ticket.update(req.body);
    res.status(200).json({ msg: "Tiket berhasil diupdate", data: ticket });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Tiket tidak ditemukan" });
    await ticket.destroy();
    res.status(200).json({ msg: "Tiket berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
