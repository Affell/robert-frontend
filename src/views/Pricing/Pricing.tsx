import { Check, Star, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import "./Pricing.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

interface PricingTier {
  id: string;
  name: string;
  grade: string;
  gradeValue: string;
  price: number;
  originalPrice?: number;
  period: string;
  requests: string;
  description: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  ctaText: string;
  color: string;
  icon: React.ReactNode;
}

const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Étudiant Moyen",
    grade: "Note",
    gradeValue: "18/20",
    price: 9,
    period: "/mois",
    requests: "10 000 requêtes",
    description: "Parfait pour débuter avec Robert AI",
    features: [
      "10 000 requêtes par mois",
      "Réponses instantanées",
      "Support par email",
      "Historique 30 jours",
      "Accès web et mobile",
    ],
    ctaText: "Commencer gratuitement",
    color: "#10b981",
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: "pro",
    name: "Bon Élève",
    grade: "Note",
    gradeValue: "19/20",
    price: 29,
    originalPrice: 39,
    period: "/mois",
    requests: "50 000 requêtes",
    description: "Idéal pour les professionnels",
    features: [
      "50 000 requêtes par mois",
      "Réponses ultra-rapides",
      "Support prioritaire 24/7",
      "Historique illimité",
      "API personnalisée",
      "Intégrations avancées",
      "Modèles IA premium",
    ],
    popular: true,
    ctaText: "Essayer Pro",
    color: "#f97316",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "enterprise",
    name: "Major de Promo",
    grade: "Note",
    gradeValue: "20/20",
    price: 99,
    period: "/mois",
    requests: "100 000 requêtes",
    description: "Pour les équipes et entreprises",
    features: [
      "100 000 requêtes par mois",
      "Performances maximales",
      "Support dédié premium",
      "Analytics avancées",
      "Sécurité renforcée",
      "Formation d'équipe",
      "SLA garantie 99.9%",
      "Personnalisation complète",
    ],
    premium: true,
    ctaText: "Contacter les ventes",
    color: "#8b5cf6",
    icon: <Crown className="w-6 h-6" />,
  },
];
export default function Pricing() {
  const navigate = useNavigate();
  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <>
      <Header />
      <div className="pricing">
        <div className="container">
          {/* En-tête */}
          <motion.div
            className="pricing-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="pricing-title">
              Choisissez votre
              <span className="gradient-text"> niveau</span>
              <br />
              avec Robert AI
            </h1>

            <p className="pricing-description">
              Comme à l'école, plus vous montez en niveau, plus vous débloquez
              de fonctionnalités ! Nos tarifs sont aussi transparents qu'un
              contrôle surprise.
            </p>
          </motion.div>

          {/* Grille des tarifs */}
          <motion.div
            className="pricing-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                className={`pricing-card ${tier.popular ? "popular" : ""} ${
                  tier.premium ? "premium" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {tier.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    <span>Plus populaire</span>
                  </div>
                )}

                <div className="card-header">
                  <div className="plan-icon" style={{ color: tier.color }}>
                    {tier.icon}
                  </div>
                  <h3 className="plan-name">{tier.name}</h3>
                  <div className="grade-container">
                    <span className="grade-label">{tier.grade}</span>
                    <span className="grade-value" style={{ color: tier.color }}>
                      {tier.gradeValue}
                    </span>
                  </div>
                </div>

                <div className="pricing-info">
                  <div className="price-container">
                    {tier.originalPrice && (
                      <span className="original-price">
                        {tier.originalPrice}€
                      </span>
                    )}
                    <span className="current-price">
                      {tier.price}€<span className="period">{tier.period}</span>
                    </span>
                  </div>
                  <div className="requests-info">
                    <span className="requests-count">{tier.requests}</span>
                    <span className="requests-label">par mois</span>
                  </div>
                  <p className="plan-description">{tier.description}</p>
                </div>

                <div className="features-list">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-item">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className={`cta-button ${tier.popular ? "popular" : ""} ${
                    tier.premium ? "premium" : ""
                  }`}
                  style={{
                    backgroundColor: tier.color,
                    borderColor: tier.color,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartChat}
                >
                  {tier.ctaText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Section FAQ/Garanties */}
          <motion.div
            className="pricing-guarantees"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="guarantees-grid">
              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <Check size={24} />
                </div>
                <h4>Essai gratuit 14 jours</h4>
                <p>Testez toutes les fonctionnalités sans engagement</p>
              </div>
              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <Zap size={24} />
                </div>
                <h4>Résiliation à tout moment</h4>
                <p>
                  Pas de piège, pas de contrainte, comme un bon devoir maison
                </p>
              </div>
              <div className="guarantee-item">
                <div className="guarantee-icon">
                  <Crown size={24} />
                </div>
                <h4>Support premium</h4>
                <p>
                  Notre équipe répond plus vite qu'un prof qui rend les copies
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
