import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTicket, getConcert } from "../utils/api";

const UserBuyTicket = () => {
  const { concertId } = useParams();
  const [concert, setConcert] = useState(null);
  const [form, setForm] = useState({
    concertId: concertId || "",
    seatName: "diamond",
    quantity: 1,
    buyerName: "",
    buyerEmail: "",
    buyerGender: "male"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil detail konser berdasarkan concertId
    const fetchConcert = async () => {
      try {
        const res = await getConcert(concertId);
        setConcert(res.data);
      } catch (err) {
        setConcert(null);
      }
    };
    if (concertId) fetchConcert();
  }, [concertId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTicket(form);
      navigate("/user/ticket/nota", { state: { ticket: res.data.data } });
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
          <label className="label">Nama Konser</label>
          <div className="control">
            <input
              className="input"
              value={concert ? concert.concertName : ""}
              disabled
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Venue</label>
          <div className="control">
            <input
              className="input"
              value={concert ? concert.venue : ""}
              disabled
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Tanggal</label>
          <div className="control">
            <input
              className="input"
              value={concert ? new Date(concert.date).toLocaleDateString() : ""}
              disabled
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Seat</label>
          <div className="control">
            <div className="select">
              <select name="seatName" value={form.seatName} onChange={handleChange} required>
                <option value="diamond">Diamond</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </div>
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
