import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Menu,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../core/hooks/useChat";
import { useAuth } from "../../core/auth/AuthContext";
import ChatHistory, { type ChatSession } from "../ChatHistory/ChatHistory";
import ChatHistoryAPI from "../ChatHistoryAPI/ChatHistoryAPI";
import UserSettings, {
  type UserPreferences,
} from "../UserSettings/UserSettings";
import Header from "../Header/Header";
import { useState } from "react";
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
  const [showSettings, setShowSettings] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
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
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: "light",
    fontSize: "medium",
    language: "fr",
    username: "Utilisateur",
    avatarColor: "#f97316",
  }); // Gestionnaires pour le mode API (utilisateurs connectés)
  const handleNewChatAPI = async () => {
    // D'abord, effacer la session courante pour éviter les conflits
    setCurrentSessionId(null);
    setShowHistory(false);

    // Créer une nouvelle session seulement au premier message
    // Pour l'instant, on met juste sessionId à null pour une nouvelle conversation
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

  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = { ...userPreferences, ...newPrefs };
    setUserPreferences(updated);
    localStorage.setItem("robert-ai-preferences", JSON.stringify(updated));
  };

  return (
    <>
      {!isAuthenticated && <Header />}

      <div
        className={`chat-component ${
          isAuthenticated ? "authenticated" : "guest"
        } ${showHistory ? "with-history" : ""}`}
      >
        {" "}
        {/* Historique des conversations (seulement si connecté) */}
        {isAuthenticated && (
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {" "}
                <ChatHistoryAPI
                  token={token || undefined}
                  isAuthenticated={isAuthenticated}
                  currentSessionId={currentSessionId}
                  onSelectSession={handleSelectSessionAPI}
                  onNewChat={handleNewChatAPI}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {/* Historique localStorage pour les utilisateurs non connectés */}
        {!isAuthenticated && (
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {" "}
                <ChatHistory
                  sessions={chatSessions}
                  onSelectSession={handleSelectSessionLocal}
                  onDeleteSession={handleDeleteSessionLocal}
                  onNewChat={handleNewChatLocal}
                  currentSessionId={localSessionId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {/* Interface de chat principale */}
        <div className="chat-main">
          {/* Header */}
          <div className="chat-header">
            <div className="header-left">
              {" "}
              <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
              </button>
              <button
                className="history-toggle"
                onClick={() => setShowHistory(!showHistory)}
              >
                <Menu size={20} />
              </button>
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

            <div className="header-actions">
              {isAuthenticated ? (
                <>
                  <button
                    className="settings-button"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings size={20} />
                  </button>
                  <button className="more-button">
                    <MoreHorizontal size={20} />
                  </button>
                </>
              ) : (
                <button
                  className="login-prompt-button"
                  onClick={() => navigate("/login")}
                >
                  Se connecter pour plus de fonctionnalités
                </button>
              )}
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
                  <div className="message-avatar">
                    {message.type === "bot" ? (
                      <Bot size={20} />
                    ) : (
                      <div
                        className="user-avatar"
                        style={{
                          backgroundColor: isAuthenticated
                            ? userPreferences.avatarColor
                            : "#f97316",
                        }}
                      >
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">
                        {message.type === "bot"
                          ? "Robert AI"
                          : isAuthenticated
                          ? userPreferences.username
                          : "Vous"}
                      </span>
                      <span className="message-time">
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
            </form>

            {!isAuthenticated && (
              <div className="trial-notice">
                💡 Connectez-vous pour sauvegarder vos conversations et accéder
                à toutes les fonctionnalités !
              </div>
            )}
          </div>
        </div>
        {/* Paramètres utilisateur (seulement si connecté) */}
        {isAuthenticated && (
          <UserSettings
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            preferences={userPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        )}
      </div>
    </>
  );
}
