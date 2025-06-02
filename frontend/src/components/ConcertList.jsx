import React, { useEffect, useState } from "react";
import { getConcerts, deleteConcert } from "../utils/api";
import { Link } from "react-router-dom";

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const res = await getConcerts();
      setConcerts(res.data);
    } catch (err) {
      setConcerts([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus konser ini?")) {
      await deleteConcert(id);
      fetchConcerts();
    }
  };

  return (
    <section className="section">
      <div className="level">
        <h1 className="title">Daftar Konser</h1>
        {isAdmin && (
          <button
            className="button is-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/welcome";
            }}
          >
            Logout
          </button>
        )}
      </div>
      {isAdmin && (
        <Link to="/concerts/add" className="button is-primary mb-3">Tambah Konser</Link>
      )}
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Venue</th>
            <th>Tanggal</th>
            <th>Harga</th>
            {isAdmin && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {concerts.map((c) => (
            <tr key={c.id}>
              <td>{c.concertName}</td>
              <td>{c.venue}</td>
              <td>{new Date(c.date).toLocaleDateString()}</td>
              <td>{c.price ? `Rp${c.price.toLocaleString()}` : "-"}</td>
              {isAdmin && (
                <td>
                  <Link to={`/concerts/edit/${c.id}`} className="button is-small is-info mr-2">Edit</Link>
                  <button className="button is-small is-danger" onClick={() => handleDelete(c.id)}>Hapus</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ConcertList;
