import {
  MessageSquare,
  Menu,
  X,
  User,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, isAuthenticated } = useAuth();

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            </button>            <button
              className="nav-link nav-button"
              onClick={() => navigate("/pricing")}
            >
              Tarifs
            </button>
            <button
              className="nav-link nav-button"
              onClick={() => navigate("/help")}
            >
              Aide
            </button>
          </nav>{" "}
          {/* Actions */}
          <div className="header-actions">
            {" "}
            <div className="account-dropdown" ref={dropdownRef}>
              <button
                className="btn btn-secondary"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="menu"
              >
                <User size={16} />
                <span>Mon compte</span>
                <ChevronDown size={16} />
              </button>
              {isAccountMenuOpen && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/profile");
                      setIsAccountMenuOpen(false);
                    }}
                  >
                    <User size={16} />
                    Profil
                  </button>
                  {!isAuthenticated && (
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/login");
                        setIsAccountMenuOpen(false);
                      }}
                    >
                      Connexion
                    </button>
                  )}
                  {isAuthenticated && (
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        setIsAccountMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </button>
                  )}
                </div>
              )}{" "}
            </div>{" "}
            <button
              className="btn btn-primary"
              onClick={() => navigate("/chat")}
            >
              {isAuthenticated ? (
                <MessageCircle size={16} />
              ) : (
                <MessageSquare size={16} />
              )}
              {isAuthenticated ? "Mes chats" : "Essayer Robert"}
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
            </button>            <button
              className="nav-link nav-button"
              onClick={() => {
                navigate("/pricing");
                setIsMobileMenuOpen(false);
              }}
            >
              Tarifs
            </button>
            <button
              className="nav-link nav-button"
              onClick={() => {
                navigate("/help");
                setIsMobileMenuOpen(false);
              }}
            >
              Aide
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
