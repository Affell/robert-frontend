import { motion } from "framer-motion";
import { ArrowLeft, Brain, Zap } from "lucide-react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axelLImage from "../../assets/img/axelL.png";
import axelMImage from "../../assets/img/axelM.png";
import maxenceImage from "../../assets/img/maxence.png";
import rubenImage from "../../assets/img/ruben.png";

export default function About() {
  const features = [
    {
      icon: <Brain size={32} />,
      title: "IA Avancée",
      description:
        "Robert AI utilise les dernières technologies d'intelligence artificielle pour comprendre et répondre à vos questions avec précision.",
    },
    {
      icon: <Zap size={32} />,
      title: "Rapide & Efficace",
      description:
        "Des réponses instantanées grâce à une architecture optimisée et des serveurs haute performance.",
    },
  ];
  const team = [
    {
      name: "Axel L",
      role: "Backend Developer & AI Integration",
      description:
        "Responsable de l'intégration du modèle IA et création du backend en Golang.",
      image: axelLImage,
    },
    {
      name: "Axel M",
      role: "Frontend Developer",
      description:
        "Développement de l'interface utilisateur et des composants React.",
      image: axelMImage,
    },
    {
      name: "Maxence",
      role: "Extension Developer",
      description:
        "Création et développement de l'extension Chrome pour Robert AI.",
      image: maxenceImage,
    },
    {
      name: "Ruben",
      role: "Frontend Developer & API Integration",
      description:
        "Développement frontend et implémentation des APIs entre les composants.",
      image: rubenImage,
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="about-page"
      >
        <div className="about-container">
          <div className="about-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
              Retour
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="about-hero"
            >
              <div className="about-logo">
                <Brain size={48} />
              </div>
              <h1>Robert AI</h1>
              <p className="about-tagline">
                Votre assistant IA intelligent pour toutes vos questions
              </p>
            </motion.div>
          </div>

          <div className="about-content">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="about-section"
            >
              <h2>Notre Mission</h2>
              <p>
                Robert AI a été conçu pour démocratiser l'accès à l'intelligence
                artificielle. Notre mission est de fournir un assistant IA
                accessible, fiable et respectueux de votre vie privée, capable
                de vous aider dans vos tâches quotidiennes.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="about-section"
            >
              <h2>Fonctionnalités Principales</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="feature-card"
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="about-section"
            >
              <h2>Technologie</h2>
              <p>
                Robert AI s'appuie sur des modèles de langage de pointe et une
                architecture cloud moderne pour offrir des performances
                optimales. Notre plateforme est construite avec les dernières
                technologies web pour garantir une expérience fluide et
                réactive.
              </p>

              <div className="tech-stack">
                <div className="tech-item">
                  <strong>Frontend:</strong> React, TypeScript, Vite
                </div>
                <div className="tech-item">
                  <strong>Backend:</strong> Golang, Echo, PostgreSQL
                </div>
                <div className="tech-item">
                  <strong>IA:</strong> LLM Anthropic
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="about-section"
            >
              <h2>Équipe</h2>{" "}
              <div className="team-grid">
                {team.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-description">{member.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
