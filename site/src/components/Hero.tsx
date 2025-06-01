import { ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import './Hero.css'

interface HeroProps {
  onStartChat: () => void
}

export function Hero({ onStartChat }: HeroProps) {
  return (
    <div className="hero">
      <div className="container">
        {/* Section principale */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Powered by IA Avancée</span>
          </div>
          
          <h1 className="hero-title">
            Votre assistant IA
            <span className="gradient-text"> intelligent</span>
            <br />
            pour tous vos besoins
          </h1>
          
          <p className="hero-description">
            Robert est un chatbot IA révolutionnaire qui comprend vos besoins et vous aide à accomplir vos tâches avec une précision remarquable. Découvrez l'avenir de l'assistance intelligente.
          </p>
          
          {/* Section des créateurs */}
          <div style={{ 
            margin: 'var(--spacing-xl) 0', 
            textAlign: 'center' as const,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h3 className="gradient-text" style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              margin: '0 0 var(--spacing-lg) 0',
              lineHeight: 1.2
            }}>
              Projet réalisé par
            </h3>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column' as const,
              gap: 'var(--spacing-sm)',
              fontSize: '1.25rem',
              lineHeight: 1.4
            }}>
              <div className="gradient-text" style={{ fontWeight: '600' }}>Messaoudi Axel</div>
              <div className="gradient-text" style={{ fontWeight: '600' }}>Vieira Ruben</div>
              <div className="gradient-text" style={{ fontWeight: '600' }}>Lenroue Axel</div>
              <div className="gradient-text" style={{ fontWeight: '600' }}>Janiak Maxence</div>
            </div>
          </div>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={onStartChat}
            >
              Commencer à discuter
              <ArrowRight size={20} />
            </button>
            
            <button className="btn btn-secondary btn-large">
              Voir la démo
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Utilisateurs actifs</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Disponibilité</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </motion.div>

        {/* Fonctionnalités */}
        <motion.div 
          className="features-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="feature-card">
            <div className="feature-icon">
              <Zap />
            </div>
            <h3 className="feature-title">Réponses instantanées</h3>
            <p className="feature-description">
              Obtenez des réponses précises et contextuelles en quelques secondes grâce à notre IA avancée.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Shield />
            </div>
            <h3 className="feature-title">Sécurisé & Privé</h3>
            <p className="feature-description">
              Vos conversations sont chiffrées et protégées. Nous respectons votre vie privée.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Users />
            </div>
            <h3 className="feature-title">Multi-utilisateurs</h3>
            <p className="feature-description">
              Parfait pour les équipes et les projets collaboratifs avec gestion des permissions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
