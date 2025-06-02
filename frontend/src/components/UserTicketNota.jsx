import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserTicketNota = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

  if (!ticket) {
    return (
      <section className="section">
        <div className="notification is-danger">Data tiket tidak ditemukan.</div>
        <button className="button" onClick={() => navigate("/user/concerts")}>Kembali ke Daftar Konser</button>
      </section>
    );
  }

  // Ambil info konser jika tersedia di ticket (misal ticket.concert)
  const concert = ticket.concert || ticket.concertData || {};
  // Fallback: jika tidak ada, tampilkan ID saja

  return (
    <section className="section">
      <h1 className="title">Nota Tiket</h1>
      <div className="box">
        <p><strong>ID Tiket:</strong> {ticket.id || ticket.ticketId}</p>
        <p><strong>ID Konser:</strong> {ticket.concertId}</p>
        <p><strong>Nama Konser:</strong> {concert.concertName || ticket.concertName || "-"}</p>
        <p><strong>Venue:</strong> {concert.venue || ticket.venue || "-"}</p>
        <p><strong>Tanggal:</strong> {concert.date ? new Date(concert.date).toLocaleDateString() : (ticket.date ? new Date(ticket.date).toLocaleDateString() : "-")}</p>
        <p><strong>Jumlah:</strong> {ticket.quantity}</p>
        <p><strong>Nama Pembeli:</strong> {ticket.buyerName}</p>
        <p><strong>Email Pembeli:</strong> {ticket.buyerEmail}</p>
        <p><strong>Gender:</strong> {ticket.buyerGender}</p>
      </div>
      <button className="button is-link" onClick={() => navigate("/user/concerts")}>Kembali ke Daftar Konser</button>
    </section>
  );
};

export default UserTicketNota;
