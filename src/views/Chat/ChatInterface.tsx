import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  MoreHorizontal,
  ArrowLeft,
  Menu,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import ChatHistory, { type ChatSession } from "../../components/ChatHistory";
import UserSettings, {
  type UserPreferences,
} from "../../components/UserSettings";
import SimpleChatInterface from "../../components/SimpleChatInterface";
import "./ChatInterface.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/AuthContext";
import { postFetch } from "../../core/api/fetch";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const { isAuthenticated, loading } = useAuth();

  // Si pas connecté, afficher l'interface simplifiée
  if (!loading && !isAuthenticated) {
    return <SimpleChatInterface />;
  }
  // Si en cours de chargement, afficher un loader
  if (loading) {
    return (
      <div className="chat-interface-loading">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  // États existants pour l'interface authentifiée
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Bienvenue dans Robert AI ! Vous avez accès à toutes les fonctionnalités : historique des conversations, paramètres personnalisés, et bien plus. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { token } = useAuth();

  // Nouveaux états pour les fonctionnalités
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState("default");
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
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Charger les préférences au montage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("robert-ai-preferences");
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setUserPreferences(prefs);

      // Appliquer le thème
      if (prefs.theme === "dark") {
        document.documentElement.classList.add("dark-theme");
      } else if (prefs.theme === "auto") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.classList.toggle("dark-theme", prefersDark);
      }

      // Appliquer la taille de police
      const sizes: Record<string, string> = {
        small: "14px",
        medium: "16px",
        large: "18px",
      };
      document.documentElement.style.setProperty(
        "--base-font-size",
        sizes[prefs.fontSize]
      );
    }

    // Charger l'historique
    const savedSessions = localStorage.getItem("robert-ai-sessions");
    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions));
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();

    // Ajouter immédiatement le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await postFetch(
        "/chat/query",
        {
          context: "website",
          query: userText,
        },
        {
          "Robert-Connect-Token": token,
        }
      );
      console.log("Réponse du bot:", response);
      if (response.status === 200) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(), // +1 pour éviter les doublons d'ID
          type: "bot",
          content: response.data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Gestion d'erreur - ajouter un message d'erreur du bot
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // Gestion d'erreur réseau/autre
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Une erreur s'est produite lors de la communication avec le serveur. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Erreur lors de l'envoi du message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: `Conversation ${chatSessions.length + 1}`,
      timestamp: Date.now(),
      messageCount: 1,
      preview: "Nouvelle conversation...",
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    setMessages([
      {
        id: "1",
        type: "bot",
        content:
          "Nouvelle conversation démarrée ! Je suis Robert, votre assistant IA personnel. Vos conversations sont sauvegardées et vous avez accès à tous les paramètres. Comment puis-je vous aider ?",
        timestamp: new Date(),
      },
    ]);
    setShowHistory(false);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    // Dans une vraie application, on chargerait les messages de cette session
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Conversation restaurée. Comment puis-je vous aider ?",
        timestamp: new Date(),
      },
    ]);
    setShowHistory(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    if (sessionId === currentSessionId && chatSessions.length > 1) {
      // Passer à une autre session
      const otherSession = chatSessions.find((s) => s.id !== sessionId);
      if (otherSession) {
        setCurrentSessionId(otherSession.id);
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
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div
      className={`chat-interface fullscreen ${
        showHistory ? "with-history" : ""
      }`}
    >
      {/* Historique des conversations */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <ChatHistory
              sessions={chatSessions}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
              onNewChat={handleNewChat}
              currentSessionId={currentSessionId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interface de chat principale */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <button
              className="history-toggle"
              onClick={() => setShowHistory(!showHistory)}
            >
              <Menu size={20} />
            </button>{" "}
            <div className="chat-title">
              <h2>Robert AI Pro</h2>
              <span className="status">En ligne • Connecté</span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="settings-button"
              onClick={() => setShowSettings(true)}
            >
              <Settings size={20} />
            </button>
            <button className="more-button">
              <MoreHorizontal size={20} />
            </button>
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
                      style={{ backgroundColor: userPreferences.avatarColor }}
                    >
                      <User size={16} />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  {" "}
                  <div className="message-header">
                    <span className="message-sender">
                      {message.type === "bot"
                        ? "Robert AI"
                        : userPreferences.username}
                    </span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>{" "}
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
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tapez votre message..."
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
        </div>
      </div>

      {/* Paramètres utilisateur */}
      <UserSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        preferences={userPreferences}
        onUpdatePreferences={handleUpdatePreferences}
      />
    </div>
  );
}
