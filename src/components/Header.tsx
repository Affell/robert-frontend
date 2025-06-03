import { MessageSquare, Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  onChatToggle: () => void
  onAboutClick?: () => void
  onPricingClick?: () => void
  onLogoClick?: () => void
}

export function Header({ onChatToggle, onAboutClick, onPricingClick, onLogoClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">          {/* Logo */}
          <button 
            className="logo logo-button" 
            onClick={onLogoClick}
            type="button"
          >
            <MessageSquare className="logo-icon" />
            <span className="logo-text">Robert AI</span>
          </button>

          {/* Navigation Desktop */}
          <nav className="nav desktop-nav">
            <a href="#features" className="nav-link">Fonctionnalités</a>
            <button 
              className="nav-link nav-button" 
              onClick={onAboutClick}
            >
              À propos
            </button>
            <button 
              className="nav-link nav-button" 
              onClick={onPricingClick}
            >
              Tarifs
            </button>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button
              className="btn btn-primary"
              onClick={onChatToggle}
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
            <a href="#features" className="nav-link">Fonctionnalités</a>
            <button 
              className="nav-link nav-button" 
              onClick={() => {
                onAboutClick?.();
                setIsMobileMenuOpen(false);
              }}
            >
              À propos
            </button>
            <button 
              className="nav-link nav-button" 
              onClick={() => {
                onPricingClick?.();
                setIsMobileMenuOpen(false);
              }}
            >
              Tarifs
            </button>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        )}
      </div>
    </header>
  )
}
