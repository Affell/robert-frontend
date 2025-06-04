import { MessageSquare, Menu, X, User } from "lucide-react";
import { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <MessageSquare className="logo-icon" />
            <span className="logo-text">Robert AI</span>
          </div>
          {/* Navigation Desktop */}
          <nav className="nav desktop-nav">
            <a href="#features" className="nav-link">
              Fonctionnalités
            </a>
            <button
              className="nav-link nav-button"
              onClick={() => navigate("/about")}
            >
              À propos
            </button>
            <button
              className="nav-link nav-button"
              onClick={() => navigate("/pricing")}
            >
              Tarifs
            </button>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>{" "}
          {/* Actions */}
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/account")}
            >
              <User size={16} />
              Mon compte
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/chat")}
            >
              <MessageSquare size={16} />
              Essayer Robert
            </button>

            {/* Menu mobile */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMobileMenuOpen && (
          <nav className="nav mobile-nav">
            <a href="#features" className="nav-link">
              Fonctionnalités
            </a>
            <button
              className="nav-link nav-button"
              onClick={() => {
                navigate("/about");
                setIsMobileMenuOpen(false);
              }}
            >
              À propos
            </button>
            <button
              className="nav-link nav-button"
              onClick={() => {
                navigate("/pricing");
                setIsMobileMenuOpen(false);
              }}
            >
              Tarifs
            </button>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
