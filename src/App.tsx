import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./views/Hero/Hero";
import ChatInterface from "./views/Chat/ChatInterface";
import About from "./views/About/About";
import Features from "./views/Features/Features";
import Pricing from "./views/Pricing/Pricing";
import Account from "./views/Connexion/Connexion";
import Profile from "./views/Profile/Profile";
import Help from "./views/Help/Help";
import { AuthProvider } from "./core/auth/AuthContext";
import ProtectedRoute from "./core/config/protectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Account />} />
          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
