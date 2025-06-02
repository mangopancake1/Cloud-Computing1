import React, { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../utils/api";
import { Link } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data);
    } catch {
      setTickets([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus tiket ini?")) {
      await deleteTicket(id);
      fetchTickets();
    }
  };

  return (
    <section className="section">
      <h1 className="title">Daftar Tiket</h1>
      <Link to="/tickets/add" className="button is-primary mb-3">Beli Tiket</Link>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nama Pembeli</th>
            <th>Email</th>
            <th>Jumlah</th>
            <th>Total Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.buyerName}</td>
              <td>{t.buyerEmail}</td>
              <td>{t.quantity}</td>
              <td>{t.totalPrice}</td>
              <td>
                <button className="button is-small is-danger" onClick={() => handleDelete(t.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TicketList;
