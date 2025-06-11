import { Heart } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo et description */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-text">Robert AI</span>
            </div>
            <p className="footer-description">
              L'assistant IA intelligent qui transforme votre façon de
              travailler et d'interagir avec la technologie.
            </p>
          </div>{" "}
          {/* Navigation */}
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              <li>
                <a href="/features">Fonctionnalités</a>
              </li>
              <li>
                <a href="/about">À propos</a>
              </li>
              <li>
                <a href="/pricing">Tarifs</a>
              </li>
              <li>
                <a href="/extension">Extension Chrome</a>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li>
                <a href="/help">Aide</a>
              </li>
              <li>
                <a href="/chat">Essayer Robert</a>
              </li>
              <li>
                <a href="/legal">Mentions légales</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 Robert AI. Tous droits réservés.
            </p>
          </div>
          <p className="footer-made-with">
            Fait avec <Heart size={16} className="heart" /> par l'équipe Robert
          </p>
        </div>
      </div>
    </footer>
  );
}
