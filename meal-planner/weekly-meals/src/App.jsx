import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import MealsPage from "./pages/MealsPage";
import AddMealPage from "./pages/AddMealPage";
import ProfilePage from "./pages/ProfilePage";

function ProtectedRoute({ children }) {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return <Navigate to="/login" replace />;
    return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/add-meal" element={<AddMealPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}