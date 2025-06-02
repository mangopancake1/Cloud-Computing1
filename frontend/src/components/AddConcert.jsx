import React, { useState } from "react";
import { createConcert } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddConcert = () => {
  const [form, setForm] = useState({ concertName: "", venue: "", date: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createConcert(form);
    navigate("/concerts");
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
        <button className="button is-primary" type="submit">Simpan</button>
      </form>
    </section>
  );
};

export default AddConcert;
