import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Shared/Header";
import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import Profile from "./components/User/Profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import RoomHistory from "./components/Room/RoomHistory";
import BookingManagement from "./pages/BookingManagement";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/rooms/:roomId/history" element={<RoomHistory />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
