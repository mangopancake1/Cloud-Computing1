import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
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
        <Route
          path="/notes"
          element={
            localStorage.getItem("token") ? <PostList /> : <Navigate to="/welcome" />
          }
        />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
