import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Help.css";

export default function Help() {
  const navigate = useNavigate();
  const faqData = [
    {
      question: "Comment commencer à utiliser Robert AI ?",
      answer:
        "Il suffit de créer un compte gratuit et vous pourrez immédiatement commencer à discuter avec Robert. Aucune configuration complexe n'est nécessaire.",
    },
    {
      question: "Comment créer un compte ?",
      answer:
        "Cliquez sur 'Mon compte' puis 'Connexion'. Sur la page de connexion, cliquez sur 'Créer un compte' et remplissez le formulaire d'inscription avec votre email et mot de passe.",
    },
    {
      question: "Comment me connecter à mon compte ?",
      answer:
        "Cliquez sur 'Mon compte' dans le header, puis sur 'Connexion'. Entrez votre email et mot de passe pour accéder à votre compte.",
    },
    {
      question: "Comment utiliser le chat ?",
      answer:
        "Une fois connecté, cliquez sur 'Mes chats' ou 'Essayer Robert' pour accéder à l'interface de chat. Tapez votre question dans la zone de texte et appuyez sur Entrée pour envoyer votre message.",
    },
    {
      question: "Robert AI est-il gratuit ?",
      answer:
        "Oui, Robert AI propose un plan gratuit avec des limitations. Pour plus de fonctionnalités avancées, consultez nos plans premium.",
    },
    {
      question: "Mes conversations sont-elles privées et sécurisées ?",
      answer:
        "Absolument. Toutes vos conversations sont chiffrées et nous ne partageons jamais vos données avec des tiers. Votre vie privée est notre priorité.",
    },
    {
      question: "Puis-je utiliser Robert AI sur mobile ?",
      answer:
        "Oui, Robert AI est entièrement responsive et fonctionne parfaitement sur tous les appareils mobiles via votre navigateur web.",
    },
    {
      question: "Comment puis-je améliorer les réponses de Robert ?",
      answer:
        "Soyez précis dans vos questions, donnez du contexte et n'hésitez pas à reformuler si la réponse ne vous convient pas. Robert apprend de chaque interaction.",
    },
  ];

  // Affiche toutes les FAQ (pas de filtre)
  const filteredFaq = faqData;

  return (
    <div className="help-page">
      <Header />

      <main className="help-container">
        {/* Header avec bouton retour */}
        <div className="help-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Retour
          </button>
        </div>
        {/* Hero Section */}
        <motion.div
          className="help-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Centre d'aide</h1>
          <p>Trouvez rapidement des réponses à vos questions sur Robert AI</p>
        </motion.div>
        {/* Actions rapides */}
        <motion.div
          className="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="action-card" onClick={() => navigate("/chat")}>
            <MessageCircle className="action-icon" size={48} />
            <h3>Démarrer un chat</h3>
            <p>Commencez immédiatement à discuter avec Robert AI</p>
          </div>
          <div className="action-card" onClick={() => navigate("/about")}>
            <Book className="action-icon" size={48} />
            <h3>En savoir plus</h3>
            <p>Découvrez les capacités et fonctionnalités de Robert</p>
          </div>
        </motion.div>
        {/* Guide de démarrage */}
        <motion.section
          className="getting-started-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2>Guide de démarrage</h2>
          <p>Suivez ces étapes simples pour commencer à utiliser Robert AI</p>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Création de compte</h3>
                <p>
                  Cliquez sur "Mon compte" dans le header, puis sur "Connexion".
                  Sur la page de connexion, cliquez sur "Créer un compte" et
                  remplissez le formulaire avec votre email et un mot de passe
                  sécurisé.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Connexion</h3>
                <p>
                  Une fois votre compte créé, connectez-vous en cliquant sur
                  "Mon compte" puis "Connexion". Entrez votre email et mot de
                  passe pour accéder à votre espace personnel.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Utilisation du Chat</h3>
                <p>
                  Cliquez sur "Mes chats" pour accéder à l'interface de chat.
                  Tapez votre question dans la zone de texte en bas de l'écran
                  et appuyez sur Entrée. Robert vous répondra instantanément !
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        {/* Section FAQ */}
        <motion.section
          className="faq-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Questions fréquentes</h2>

          <div className="faq-list">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">{item.question}</summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))
            ) : (
              <div className="no-results">
                <p>Aucune question trouvée.</p>
              </div>
            )}
          </div>
        </motion.section>{" "}
      </main>
      <Footer />
    </div>
  );
}
