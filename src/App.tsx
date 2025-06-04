import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Hero from "./views/Hero/Hero";
import ChatInterface from "./views/Chat/ChatInterface";
import About from "./views/About/About";
import Pricing from "./views/Pricing/Pricing";
import Account from "./views/Account/Account";

function PricingWrapper() {
  const navigate = useNavigate();
  
  const handleStartChat = () => {
    navigate("/chat");
  };

  return <Pricing onStartChat={handleStartChat} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<PricingWrapper />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
