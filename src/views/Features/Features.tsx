import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  Brain, 
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Features.css";

export default function Features() {
  const navigate = useNavigate();
  const allFeatures = [
    {
      icon: <MessageSquare size={32} />,
      title: "Chat Intelligent",
      description: "Interface de chat moderne avec réponses instantanées et contextualisation avancée.",
      features: ["Réponses en temps réel", "Historique des conversations", "Interface intuitive", "Mode sombre/clair"]
    },
    {
      icon: <Brain size={32} />,
      title: "IA Conversationnelle",
      description: "Modèles de langage de pointe pour des conversations naturelles et pertinentes.",
      features: ["Compréhension contextuelle", "Réponses personnalisées", "Apprentissage continu", "Multi-langues"]
    },
    {
      icon: <Shield size={32} />,
      title: "Sécurité Avancée",
      description: "Protection complète de vos données avec chiffrement de bout en bout.",
      features: ["Chiffrement AES-256", "Authentification 2FA", "Conformité RGPD", "Audit sécurité"]
    }
  ];

  return (
    <div className="features-page">
      <Header />
      
      <main className="features-container">
        {/* Header avec bouton retour */}
        <div className="features-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Retour
          </button>
        </div>

        {/* Hero Section */}
        <motion.div 
          className="features-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Fonctionnalités Robert AI</h1>
          <p>Découvrez toutes les capacités de votre assistant IA intelligent</p>
        </motion.div>        {/* Grille des fonctionnalités */}
        <motion.div 
          className="features-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {allFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-list">
                  {feature.features.map((item, idx) => (
                    <li key={idx}>
                      <span className="feature-bullet">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section CTA */}
        <motion.section 
          className="features-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2>Prêt à explorer toutes ces fonctionnalités ?</h2>
          <p>Commencez dès maintenant et découvrez la puissance de Robert AI</p>
          
          <div className="cta-actions">
            <button 
              className="cta-btn primary"
              onClick={() => navigate("/chat")}
            >
              <MessageSquare size={20} />
              Essayer maintenant
            </button>
            <button 
              className="cta-btn secondary" 
              onClick={() => navigate("/pricing")}
            >
              Voir les tarifs
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
