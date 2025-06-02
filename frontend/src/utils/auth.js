import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5010", // ganti ke URL backend jika sudah deploy
  withCredentials: true, // penting untuk cookie refreshToken
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
