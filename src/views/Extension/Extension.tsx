import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Chrome,
  Info,
  Shield,
  MessageSquare,
  Search,
  FileText,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Extension.css";
import { Config } from "../../core/config/global";

export default function Extension() {
  const navigate = useNavigate();

  // Lien vers le fichier ZIP de l'extension (vous devrez héberger ce fichier)
  const EXTENSION_DOWNLOAD_URL =
    Config.Urls.API + "/cdn/robert-extension-latest.zip";

  const handleDownload = () => {
    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.href = EXTENSION_DOWNLOAD_URL;
    link.download = "robert-extension.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="extension-page">
      <Header />

      <main className="extension-container">
        {" "}
        {/* Header avec bouton retour */}
        <div className="extension-header">
          <button className="extension-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Retour
          </button>
        </div>
        {/* Hero Section */}
        <motion.div
          className="extension-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="extension-icon">
            <Chrome size={48} />
          </div>{" "}
          <h1>Extension Chrome Robert AI</h1>
          <p>
            Extension de cybersécurité dédiée au domaine UPHF. Analysez les
            pages web, détectez les vulnérabilités et bénéficiez d'un assistant
            IA spécialisé !
          </p>
        </motion.div>{" "}
        {/* Section de téléchargement */}
        <motion.section
          className="extension-download-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="extension-download-card">
            <h2>Télécharger l'extension</h2>
            <p>
              Cliquez sur le bouton ci-dessous pour télécharger l'extension
              Robert AI pour Chrome sous format ZIP.
            </p>

            <button className="extension-download-btn" onClick={handleDownload}>
              <Download size={20} />
              Télécharger Robert Extension
            </button>

            <div className="extension-download-info">
              <Info size={16} />
              <span>Fichier ZIP - Compatible avec Chrome 88+</span>
            </div>
          </div>
        </motion.section>{" "}
        {/* Instructions d'installation */}
        <motion.section
          className="extension-installation-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Instructions d'installation</h2>
          <div className="extension-installation-steps">
            <div className="extension-step">
              <div className="extension-step-number">1</div>
              <div className="extension-step-content">
                <h3>Télécharger l'extension</h3>
                <p>
                  Cliquez sur le bouton de téléchargement ci-dessus pour obtenir
                  le fichier ZIP de l'extension Robert AI.
                </p>
              </div>
            </div>

            <div className="extension-step">
              <div className="extension-step-number">2</div>
              <div className="extension-step-content">
                <h3>Extraire le fichier ZIP</h3>
                <p>
                  Décompressez le fichier ZIP téléchargé dans un dossier de
                  votre choix. Vous obtiendrez un dossier contenant les fichiers
                  de l'extension.
                </p>
              </div>
            </div>

            <div className="extension-step">
              <div className="extension-step-number">3</div>
              <div className="extension-step-content">
                <h3>Ouvrir Chrome et accéder aux extensions</h3>
                <p>
                  Dans Chrome, allez dans le menu (3 points en haut à droite) →
                  "Plus d'outils" → "Extensions" ou tapez directement
                  <code>chrome://extensions/</code> dans la barre d'adresse.
                </p>
              </div>
            </div>

            <div className="extension-step">
              <div className="extension-step-number">4</div>
              <div className="extension-step-content">
                <h3>Activer le mode développeur</h3>
                <p>
                  En haut à droite de la page des extensions, activez le bouton
                  "Mode développeur" (Developer mode).
                </p>
              </div>
            </div>

            <div className="extension-step">
              <div className="extension-step-number">5</div>
              <div className="extension-step-content">
                <h3>Charger l'extension</h3>
                <p>
                  Cliquez sur "Charger l'extension non empaquetée" (Load
                  unpacked) et sélectionnez le dossier que vous avez extrait à
                  l'étape 2.
                </p>
              </div>
            </div>

            <div className="extension-step">
              <div className="extension-step-number">6</div>
              <div className="extension-step-content">
                <h3>Profiter de Robert AI !</h3>
                <p>
                  L'extension Robert AI est maintenant installée ! Vous devriez
                  voir son icône dans la barre d'outils de Chrome. Cliquez
                  dessus pour commencer à utiliser Robert AI directement depuis
                  votre navigateur.
                </p>
              </div>
            </div>
          </div>{" "}
        </motion.section>{" "}
        {/* Fonctionnalités de l'extension */}
        <motion.section
          className="extension-features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Fonctionnalités de l'extension</h2>
          <div className="extension-features-grid">
            {" "}
            <div className="extension-feature-item extension-featured">
              <Shield size={20} />
              <div className="extension-feature-content">
                <h3>Activation domaine UPHF</h3>
                <p>
                  L'extension s'active uniquement sur le site uphf.fr et tous
                  ses sous-domaines pour une sécurité optimale
                </p>
              </div>
            </div>
            <div className="extension-feature-item">
              <MessageSquare size={20} />
              <div className="extension-feature-content">
                <h3>Chat cybersécurité UPHF</h3>
                <p>
                  Assistant IA spécialisé en cybersécurité pour répondre aux
                  questions spécifiques de l'UPHF
                </p>
              </div>
            </div>
            <div className="extension-feature-item">
              <Search size={20} />
              <div className="extension-feature-content">
                <h3>Analyse de vulnérabilités</h3>
                <p>
                  Scanner automatique des pages web pour détecter les failles de
                  sécurité potentielles
                </p>
              </div>
            </div>
            <div className="extension-feature-item">
              <FileText size={20} />
              <div className="extension-feature-content">
                <h3>Résumé de page web</h3>
                <p>
                  Génération automatique de résumés des pages visitées pour une
                  meilleure compréhension
                </p>
              </div>
            </div>
            <div className="extension-feature-item">
              <Mail size={20} />
              <div className="extension-feature-content">
                <h3>Analyse de mails</h3>
                <p>
                  Détection des emails suspects et analyse de sécurité pour
                  protéger contre le phishing
                </p>
              </div>
            </div>{" "}
          </div>
        </motion.section>
        {/* Section d'aide */}
        <motion.section
          className="extension-help-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2>Besoin d'aide ?</h2>
          <p>
            Si vous rencontrez des difficultés lors de l'installation, n'hésitez
            pas à consulter notre centre d'aide ou à nous contacter.
          </p>

          <div className="extension-help-actions">
            <button
              className="extension-help-btn extension-secondary"
              onClick={() => navigate("/help")}
            >
              Centre d'aide
            </button>
            <button
              className="extension-help-btn extension-primary"
              onClick={() => navigate("/chat")}
            >
              Essayer Robert en ligne
            </button>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
