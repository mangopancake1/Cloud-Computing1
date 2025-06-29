import React, { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      // Simpan token & role ke localStorage
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.user.role);
      // Redirect sesuai role
      if (res.data.user.role === "admin") {
        navigate("/concerts");
      } else {
        navigate("/user/concerts");
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Login gagal. Username atau password salah.");
    }
  };

  return (
    <section className="section">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" name="username" value={form.username} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
        </div>
        {error && <p className="has-text-danger">{error}</p>}
        <button className="button is-primary" type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;