import React, { useEffect, useState } from "react";
import { getConcerts } from "../utils/api";
import { useNavigate } from "react-router-dom";

const UserConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const navigate = useNavigate();

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

  const handleBuy = (concertId) => {
    navigate(`/user/concerts/buy/${concertId}`);
  };

  return (
    <section className="section">
      <h1 className="title">Daftar Konser</h1>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Venue</th>
            <th>Tanggal</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {concerts.map((c) => (
            <tr key={c.id}>
              <td>{c.concertName}</td>
              <td>{c.venue}</td>
              <td>{new Date(c.date).toLocaleDateString()}</td>
              <td>{c.description}</td>
              <td>
                <button
                  className="button is-primary"
                  onClick={() => handleBuy(c.id)}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserConcertList;
