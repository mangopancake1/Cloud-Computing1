import api from "./auth";

// Concerts
export const getConcerts = () => api.get("/concerts");
export const getConcert = (id) => api.get(`/concerts/${id}`);
export const createConcert = (concert) => api.post("/create-concert", concert);
export const updateConcert = (id, concert) => api.put(`/update-concert/${id}`, concert);
export const deleteConcert = (id) => api.delete(`/delete-concert/${id}`);

// Tickets
export const getTickets = () => api.get("/tickets");
export const getTicket = (id) => api.get(`/tickets/${id}`);
export const createTicket = (ticket) => api.post("/create-ticket", ticket);
export const updateTicket = (id, ticket) => api.put(`/tickets/${id}`, ticket);
export const deleteTicket = (id) => api.delete(`/delete-ticket/${id}`);

// Users (admin)
export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, user) => api.put(`/update-users/${id}`, user);
export const deleteUser = (id) => api.delete(`/delete-users/${id}`);

// Auth routes
export const loginUser = (user) => api.post("/login", user);
export const registerUser = (user) => api.post("/create-users", user);
