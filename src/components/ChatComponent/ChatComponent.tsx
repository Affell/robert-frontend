import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, House, Menu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../core/hooks/useChat";
import { useAuth } from "../../core/auth/AuthContext";
import ChatHistory, { type ChatSession } from "../ChatHistory/ChatHistory";
import ChatHistoryAPI from "../ChatHistoryAPI/ChatHistoryAPI";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import "./ChatComponent.css";

interface ChatComponentProps {
  isAuthenticated: boolean;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ChatComponent({ isAuthenticated }: ChatComponentProps) {
  const navigate = useNavigate();
  const { token } = useAuth(); // États pour les fonctionnalités avancées (seulement si connecté)
  const [showHistory, setShowHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

  // Gestion des gestes tactiles pour l'offcanvas
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Distance minimale pour considérer un swipe
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    // Fermer l'offcanvas avec un swipe vers la gauche
    if (isLeftSwipe && showHistory) {
      setShowHistory(false);
    }
  };

  // Fermeture avec Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showHistory) {
        setShowHistory(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showHistory]);

  // Gestion de l'accessibilité et du focus
  useEffect(() => {
    if (showHistory) {
      // Bloquer le scroll du body
      document.body.style.overflow = "hidden";
      // Focus sur l'offcanvas pour l'accessibilité
      const sidebar = document.querySelector(".offcanvas-sidebar");
      if (sidebar) {
        (sidebar as HTMLElement).setAttribute("tabindex", "-1");
        (sidebar as HTMLElement).focus();
      }
    } else {
      // Restaurer le scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showHistory]);
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSubmit,
  } = useChat({
    isAuthenticated,
    token: token || undefined,
    sessionId: currentSessionId, // Utiliser la session courante
    onSessionCreated: (newSessionId) => setCurrentSessionId(newSessionId), // Callback pour la création de session
  });

  // États pour localStorage (mode non connecté uniquement)
  const [localSessionId, setLocalSessionId] = useState("default");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "Conversation actuelle",
      timestamp: Date.now(),
      messageCount: 1,
      preview: "Bonjour ! Je suis Robert, votre assistant IA...",
    },
  ]);
  const handleNewChatAPI = async () => {
    // D'abord, effacer la session courante pour éviter les conflits
    setCurrentSessionId(null);
    setShowHistory(false);

    // Forcer le rechargement des messages par défaut
    // Le useEffect dans useChat va détecter que sessionId === null et remettre les messages par défaut
  };

  const handleSelectSessionAPI = (sessionId: number) => {
    setCurrentSessionId(sessionId);
    setShowHistory(false);
  };

  // Gestionnaires pour le mode localStorage (utilisateurs non connectés)
  const handleNewChatLocal = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: `Conversation ${chatSessions.length + 1}`,
      timestamp: Date.now(),
      messageCount: 1,
      preview: "Nouvelle conversation...",
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setLocalSessionId(newSessionId);
    setShowHistory(false);
  };

  const handleSelectSessionLocal = (sessionId: string) => {
    setLocalSessionId(sessionId);
    setShowHistory(false);
  };

  const handleDeleteSessionLocal = (sessionId: string) => {
    if (sessionId === localSessionId && chatSessions.length > 1) {
      const otherSession = chatSessions.find((s) => s.id !== sessionId);
      if (otherSession) {
        setLocalSessionId(otherSession.id);
      }
    }
    setChatSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);
      localStorage.setItem("robert-ai-sessions", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <>
      {!isAuthenticated && <Header />}

      <div
        className={`chat-component ${
          isAuthenticated ? "authenticated" : "guest"
        }`}
      >
        {" "}
        {/* Overlay avec gestion d'état moderne */}
        {showHistory && (
          <div
            className={`offcanvas-overlay ${showHistory ? "active" : ""}`}
            onClick={() => setShowHistory(false)}
          />
        )}{" "}
        {/* Offcanvas Sidebar */}
        <div
          className={`offcanvas-sidebar ${showHistory ? "active" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isAuthenticated ? (
            <ChatHistoryAPI
              token={token || undefined}
              isAuthenticated={isAuthenticated}
              currentSessionId={currentSessionId}
              onSelectSession={handleSelectSessionAPI}
              onNewChat={handleNewChatAPI}
            />
          ) : (
            <ChatHistory
              sessions={chatSessions}
              onSelectSession={handleSelectSessionLocal}
              onDeleteSession={handleDeleteSessionLocal}
              onNewChat={handleNewChatLocal}
              currentSessionId={localSessionId}
            />
          )}
        </div>
        {/* Interface de chat principale */}
        <div className="chat-main">
          {/* Header */}
          <div className="chat-header">
            {" "}
            <div className="header-left">
              {" "}
              <button className="back-button" onClick={() => navigate("/")}>
                <House size={20} />
              </button>
              {isAuthenticated && (
                <button
                  className="history-toggle"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <Menu size={20} />
                </button>
              )}
              <div className="chat-title">
                <h2>
                  {isAuthenticated
                    ? "Robert AI Pro"
                    : "Robert AI - Essai gratuit"}
                </h2>
                <span className="status">
                  {isAuthenticated
                    ? "En ligne • Connecté"
                    : "Mode démonstration"}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`message ${message.type}`}
                >
                  {" "}
                  <div className="message-avatar">
                    {message.type === "bot" ? (
                      <Bot size={20} />
                    ) : (
                      <User
                        size={20}
                        style={{
                          color: "#f97316",
                        }}
                      />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span
                        className="message-sender"
                        style={{
                          color: message.type === "bot" ? "#f97316" : "#222",
                        }}
                      >
                        {message.type === "bot"
                          ? "Robert AI"
                          : isAuthenticated
                          ? "Vous"
                          : "Utilisateur"}
                      </span>
                      <span
                        className="message-time"
                        style={{
                          color: message.type === "bot" ? "#f97316" : "#222",
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="message-text">
                      {message.type === "bot" ? (
                        <div className="markdown-content">
                          <ReactMarkdown
                            components={{
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Indicateur de frappe */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="typing-indicator"
                >
                  {" "}
                  <div className="message-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isAuthenticated
                    ? "Tapez votre message..."
                    : "Tapez votre message pour essayer Robert AI..."
                }
                className="chat-input"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                className="send-button"
                disabled={!inputValue.trim() || isTyping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </form>{" "}
            {!isAuthenticated && (
              <div className="trial-notice">
                <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                  🚀
                </span>
                <strong>Débloquez toutes les fonctionnalités !</strong>
                <br />
                <span style={{ opacity: 0.9 }}>
                  Connectez-vous pour sauvegarder vos conversations, accéder à
                  l'historique et personnaliser votre expérience
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
