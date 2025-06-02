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

  // Ambil info konser dari ticket.concert jika ada, fallback ke ticket.concertName/dll jika tidak ada
  const concert = ticket.concert || {};
  const concertName = concert.concertName || ticket.concertName || "-";
  const venue = concert.venue || ticket.venue || "-";
  const date =
    concert.date
      ? new Date(concert.date).toLocaleDateString()
      : (ticket.date ? new Date(ticket.date).toLocaleDateString() : "-");
  // Ambil harga dari concert/price, fallback ke ticket.price
  const price = concert.price || ticket.price || 0;
  const quantity = ticket.quantity || 1;
  // Hitung total price
  const totalPrice = ticket.totalPrice || (price * quantity);

  return (
    <section className="section">
      <h1 className="title">Nota Tiket</h1>
      <div className="box">
        <p><strong>ID Tiket:</strong> {ticket.id || ticket.ticketId}</p>
        <p><strong>ID Konser:</strong> {ticket.concertId}</p>
        <p><strong>Nama Konser:</strong> {concertName}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Tanggal:</strong> {date}</p>
        <p><strong>Jumlah:</strong> {quantity}</p>
        <p><strong>Total Harga:</strong> {totalPrice ? `Rp${totalPrice.toLocaleString()}` : "-"}</p>
        <p><strong>Nama Pembeli:</strong> {ticket.buyerName}</p>
        <p><strong>Email Pembeli:</strong> {ticket.buyerEmail}</p>
        <p><strong>Gender:</strong> {ticket.buyerGender}</p>
      </div>
      <button className="button is-link" onClick={() => navigate("/user/concerts")}>Kembali ke Daftar Konser</button>
    </section>
  );
};

export default UserTicketNota;
