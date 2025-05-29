import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-backend141-637581838712.us-central1.run.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Added Authorization header");
  }
  return config;
});

export default api;
