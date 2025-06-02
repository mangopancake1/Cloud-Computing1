import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConcertList from "./components/ConcertList";
import AddConcert from "./components/AddConcert";
import EditConcert from "./components/EditConcert";
import TicketList from "./components/TicketList";
import AddTicket from "./components/AddTicket";
import UserList from "./components/UserList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/concerts" element={<ConcertList />} />
        <Route path="/concerts/add" element={<AddConcert />} />
        <Route path="/concerts/edit/:id" element={<EditConcert />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/tickets/add" element={<AddTicket />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
