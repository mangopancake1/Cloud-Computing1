import React, { useState } from "react";
import { createConcert } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddConcert = () => {
  const [form, setForm] = useState({ concertName: "", venue: "", date: "", description: "", price: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createConcert({
        ...form,
        date: form.date // sudah dalam format YYYY-MM-DD dari input type="date"
      });
      navigate("/concerts");
    } catch (err) {
      alert("Gagal menyimpan konser. Pastikan semua data sudah benar.");
    }
  };

  return (
    <section className="section">
      <h1 className="title">Tambah Konser</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nama Konser</label>
          <div className="control">
            <input className="input" name="concertName" value={form.concertName} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Venue</label>
          <div className="control">
            <input className="input" name="venue" value={form.venue} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Tanggal</label>
          <div className="control">
            <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Deskripsi</label>
          <div className="control">
            <textarea className="textarea" name="description" value={form.description} onChange={handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label">Harga (Rp)</label>
          <div className="control">
            <input className="input" type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
          </div>
        </div>
        <button className="button is-primary" type="submit">Simpan</button>
        <button
          type="button"
          className="button is-light ml-2"
          onClick={() => navigate("/concerts")}
        >
          Back
        </button>
      </form>
    </section>
  );
};

export default AddConcert;
