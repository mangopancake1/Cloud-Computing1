import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../utils/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus user ini?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <section className="section">
      <h1 className="title">Daftar User</h1>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="button is-small is-danger" onClick={() => handleDelete(u.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserList;
