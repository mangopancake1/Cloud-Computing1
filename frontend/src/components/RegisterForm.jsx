import React, { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registrasi gagal. Username/email sudah digunakan.");
    }
  };

  return (
    <section className="section">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" name="username" value={form.username} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" name="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
        </div>
        {error && <p className="has-text-danger">{error}</p>}
        <button className="button is-primary" type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
