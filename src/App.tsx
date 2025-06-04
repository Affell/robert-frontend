import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./views/Hero/Hero";
import ChatInterface from "./views/Chat/ChatInterface";
import About from "./views/About/About";
import Pricing from "./views/Pricing/Pricing";
import Account from "./views/Account/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
