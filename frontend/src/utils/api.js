import api from "./auth";

export const getNotes = () => api.get("/notes");

export const getNote = (id) => api.get(`/notes/${id}`);

export const createNote = (note) => api.post("/notes", note);

export const updateNote = (id, note) => api.put(`/notes/${id}`, note);

export const deleteNote = (id) => api.delete(`/notes/${id}`);

// Auth routes
export const loginUser = (user) => api.post("/login", user);

export const registerUser = (user) => api.post("/create-users", user);
