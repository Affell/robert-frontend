import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
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
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Liens produit */}
          <div className="footer-section">
            <h3 className="footer-title">Produit</h3>
            <ul className="footer-links">
              <li>
                <a href="#features">Fonctionnalités</a>
              </li>
              <li>
                <a href="#pricing">Tarifs</a>
              </li>
              <li>
                <a href="#api">API</a>
              </li>
              <li>
                <a href="#changelog">Changelog</a>
              </li>
            </ul>
          </div>

          {/* Liens ressources */}
          <div className="footer-section">
            <h3 className="footer-title">Ressources</h3>
            <ul className="footer-links">
              <li>
                <a href="#docs">Documentation</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#guides">Guides</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>

          {/* Liens entreprise */}
          <div className="footer-section">
            <h3 className="footer-title">Entreprise</h3>
            <ul className="footer-links">
              <li>
                <a href="#about">À propos</a>
              </li>
              <li>
                <a href="#careers">Carrières</a>
              </li>              <li>
                <a href="#press">Presse</a>
              </li>
              <li>
                <a href="/help">Aide</a>
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
            <div className="footer-bottom-links">
              <a href="#privacy">Confidentialité</a>
              <a href="#terms">Conditions</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
          <p className="footer-made-with">
            Fait avec <Heart size={16} className="heart" /> par l'équipe Robert
          </p>
        </div>
      </div>
    </footer>
  );
}
