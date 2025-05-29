import Ticket from "../models/ticketModel.js";
import SeatClass from "../models/seatClassModel.js";
import Concert from "../models/concertModel.js";
import User from "../models/userModel.js";

// 📌 Buat pembelian tiket (oleh user)
export const createTicket = async (req, res) => {
  try {
    const {
      seatClassId,
      quantity,
      name,
      email,
      gender
    } = req.body;

    const userId = req.user.id;

    if (!seatClassId || !quantity || !name || !email || !gender) {
      return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    const seatClass = await SeatClass.findByPk(seatClassId);
    if (!seatClass) return res.status(404).json({ msg: "Seat class tidak ditemukan" });

    if (seatClass.remaining < quantity) {
      return res.status(400).json({ msg: "Jumlah kursi tidak mencukupi" });
    }

    const totalPrice = seatClass.price * quantity;

    const ticket = await Ticket.create({
      seatClassId,
      userId,
      name,
      email,
      gender,
      quantity,
      totalPrice
    });

    seatClass.remaining -= quantity;
    await seatClass.save();

    res.status(201).json({
      msg: "Tiket berhasil dipesan",
      data: {
        ticketId: ticket.id,
        name,
        email,
        gender,
        seatClass: seatClass.className,
        concertId: seatClass.concertId,
        quantity,
        totalPrice
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

// 📌 (Opsional) Admin melihat semua tiket
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

