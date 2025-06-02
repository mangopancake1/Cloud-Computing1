import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Selamat Datang di Concert Ticket App</h1>
      <div className="buttons mt-4">
        <Link to="/login" className="button is-primary">Login</Link>
        <Link to="/register" className="button is-link">Register</Link>
      </div>
    </div>
  </section>
);

export default HomePage;
