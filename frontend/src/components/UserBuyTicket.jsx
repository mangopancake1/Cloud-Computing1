import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTicket } from "../utils/api";

const UserBuyTicket = () => {
  const { concertId } = useParams();
  const [form, setForm] = useState({
    concertId: concertId || "",
    seatClassId: "",
    quantity: 1,
    buyerName: "",
    buyerEmail: "",
    buyerGender: "male"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simpan data ke backend
      const res = await createTicket(form);
      // Kirim data ke halaman nota via state
      navigate("/user/ticket/nota", { state: { ticket: res.data } });
    } catch (err) {
      setError("Gagal membeli tiket.");
    }
  };

  return (
    <section className="section">
      <h1 className="title">Beli Tiket</h1>
      {error && <div className="notification is-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">ID Konser</label>
          <div className="control">
            <input className="input" name="concertId" value={form.concertId} readOnly />
          </div>
        </div>
        <div className="field">
          <label className="label">ID Seat Class</label>
          <div className="control">
            <input className="input" name="seatClassId" value={form.seatClassId} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Jumlah</label>
          <div className="control">
            <input className="input" type="number" name="quantity" value={form.quantity} onChange={handleChange} min="1" required />
          </div>
        </div>
        <div className="field">
          <label className="label">Nama Pembeli</label>
          <div className="control">
            <input className="input" name="buyerName" value={form.buyerName} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Email Pembeli</label>
          <div className="control">
            <input className="input" name="buyerEmail" value={form.buyerEmail} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Gender</label>
          <div className="control">
            <div className="select">
              <select name="buyerGender" value={form.buyerGender} onChange={handleChange}>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
        </div>
        <button className="button is-primary" type="submit">Done</button>
      </form>
    </section>
  );
};

export default UserBuyTicket;
