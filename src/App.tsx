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
import ResetPassword from "./views/ResetPassword/ResetPassword";
import { AuthProvider } from "./core/auth/AuthContext";
import ProtectedRoute from "./core/config/protectedRoute";
import Legal from "./views/Legal/Legal";
import Extension from "./views/Extension/Extension";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />{" "}
          <Route path="/help" element={<Help />} />
          <Route path="/extension" element={<Extension />} />
          <Route path="/login" element={<Account />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/legal" element={<Legal />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
