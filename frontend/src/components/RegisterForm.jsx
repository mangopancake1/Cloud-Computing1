import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="columns is-centered" style={{ backgroundColor: "#A9B5DF", minHeight: "100vh", padding: "2rem" }}>
      <div className="column is-half">
        <div className="box" style={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#EAE2C6" }}>
          <h1 className="title has-text-centered" style={{ color: "#27445D" }}>Register</h1>
          {errorMessage && <div className="notification is-danger">{errorMessage}</div>}
          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input className="input"type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="field has-text-centered">
              <button type="submit" className="button is-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
