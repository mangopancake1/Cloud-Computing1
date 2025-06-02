import React, { useEffect, useState } from "react";
import { getConcerts, deleteConcert } from "../utils/api";
import { Link } from "react-router-dom";

const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);

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
      <h1 className="title">Daftar Konser</h1>
      <Link to="/concerts/add" className="button is-primary mb-3">Tambah Konser</Link>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Venue</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((c) => (
            <tr key={c.id}>
              <td>{c.concertName}</td>
              <td>{c.venue}</td>
              <td>{new Date(c.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/concerts/edit/${c.id}`} className="button is-small is-info mr-2">Edit</Link>
                <button className="button is-small is-danger" onClick={() => handleDelete(c.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ConcertList;
