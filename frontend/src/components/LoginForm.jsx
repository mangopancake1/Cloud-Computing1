import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser({ username, password });
    console.log("Login response:", response); 
    console.log("Isi response.data:", response.data);

    // Pastikan key token sesuai
    localStorage.setItem("token", response.data.accessToken);

    navigate("/notes");
  } catch (error) {
    console.error("Login failed:", error);
    setErrorMessage("Invalid username or password.");
  }
};

  return (
    <div
      className="columns is-centered"
      style={{ backgroundColor: "#A9B5DF", minHeight: "100vh", padding: "2rem" }}
    >
      <div className="column is-half">
        <div
          className="box"
          style={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#EAE2C6" }}
        >
          <h1 className="title has-text-centered" style={{ color: "#27445D" }}>
            Login
          </h1>
          {errorMessage && (
            <div className="notification is-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field has-text-centered">
              <button type="submit" className="button is-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
