import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="columns is-centered"
      style={{ backgroundColor: "#A9B5DF", minHeight: "100vh", padding: "2rem" }}
    >
      <div className="column is-half">
        <div
          className="box"
          style={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#EAE2C6", textAlign: "center" }}
        >
          <h1 className="title" style={{ color: "#27445D" }}>Welcome to Notes App</h1>
          <div className="buttons is-centered mt-4">
            <button className="button is-primary" onClick={() => navigate("/login")}>Login</button>
            <button className="button is-link" onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
