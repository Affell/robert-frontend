import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Shield, Zap, Users, Github, Mail, Globe } from 'lucide-react';
import './About.css';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'IA Avancée',
      description: 'Robert AI utilise les dernières technologies d\'intelligence artificielle pour comprendre et répondre à vos questions avec précision.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Sécurisé & Privé',
      description: 'Vos conversations sont chiffrées et votre vie privée est notre priorité. Aucune donnée n\'est partagée avec des tiers.'
    },
    {
      icon: <Zap size={32} />,
      title: 'Rapide & Efficace',
      description: 'Des réponses instantanées grâce à une architecture optimisée et des serveurs haute performance.'
    },
    {
      icon: <Users size={32} />,
      title: 'Interface Intuitive',
      description: 'Une expérience utilisateur pensée pour être simple, élégante et accessible à tous.'
    }
  ];

  const team = [
    {
      name: 'Équipe Robert AI',
      role: 'Développement & IA',
      description: 'Une équipe passionnée dédiée à créer la meilleure expérience d\'assistant IA.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="about-page"
    >
      <div className="about-container">
        <div className="about-header">
          <button className="back-btn" onClick={onBack}>
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
              Robert AI a été conçu pour démocratiser l'accès à l'intelligence artificielle. 
              Notre mission est de fournir un assistant IA accessible, fiable et respectueux 
              de votre vie privée, capable de vous aider dans vos tâches quotidiennes.
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
              Robert AI s'appuie sur des modèles de langage de pointe et une architecture 
              cloud moderne pour offrir des performances optimales. Notre plateforme est 
              construite avec les dernières technologies web pour garantir une expérience 
              fluide et réactive.
            </p>
            
            <div className="tech-stack">
              <div className="tech-item">
                <strong>Frontend:</strong> React, TypeScript, Vite
              </div>
              <div className="tech-item">
                <strong>Backend:</strong> Node.js, Express, PostgreSQL
              </div>
              <div className="tech-item">
                <strong>IA:</strong> Modèles de langage avancés
              </div>
              <div className="tech-item">
                <strong>Infrastructure:</strong> Cloud scalable et sécurisé
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="about-section"
          >
            <h2>Équipe</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">
                    <Brain size={24} />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-description">{member.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="about-section contact-section"
          >
            <h2>Contact</h2>
            <p>
              Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter !
            </p>
            
            <div className="contact-links">
              <a href="mailto:contact@robert-ai.com" className="contact-link">
                <Mail size={20} />
                contact@robert-ai.com
              </a>
              <a href="https://github.com/robert-ai" className="contact-link">
                <Github size={20} />
                GitHub
              </a>
              <a href="https://robert-ai.com" className="contact-link">
                <Globe size={20} />
                Site Web
              </a>
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="about-footer"
        >
          <p>&copy; 2024 Robert AI. Tous droits réservés.</p>
          <p>Version 1.0.0 - Bêta</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
