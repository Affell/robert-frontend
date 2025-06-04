import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import "./SimpleChatInterface.css";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function SimpleChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "👋 Bonjour ! Je suis Robert, votre assistant IA. Essayez-moi gratuitement ! Pour accéder à toutes les fonctionnalités (historique, paramètres, etc.), connectez-vous.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "C'est une excellente question ! Laissez-moi y réfléchir...",
        "Je comprends votre demande. Voici ce que je peux vous dire à ce sujet...",
        "Intéressant ! Basé sur votre question, je recommande...",
        "Merci pour cette question. Voici mon analyse...",
        "C'est un sujet fascinant. Permettez-moi de vous expliquer...",
        "Excellente question ! Pour vous donner une réponse complète...",
        "Je vois ce que vous voulez dire. Dans ce contexte...",
        "C'est un point très pertinent. Voici ce que je peux vous dire...",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content:
          randomResponse +
          " " +
          `Concernant "${userMessage}", voici ma réponse détaillée qui devrait vous aider à mieux comprendre le sujet.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    simulateBotResponse(userMessage.content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <div className="simple-chat-interface">
        {/* Interface de chat simple */}
        <div className="simple-chat-main">
          {/* Header */}
          <div className="simple-chat-header">
            <div className="header-left">
              <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
              </button>
              <div className="chat-title">
                <h2>Robert AI - Essai gratuit</h2>
                <span className="status">Mode démonstration</span>
              </div>
            </div>
            <div className="header-actions">
              {" "}
              <button
                className="login-prompt-button"
                onClick={() => navigate("/login")}
              >
                Se connecter pour plus de fonctionnalités
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
                      <div className="user-avatar">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">
                        {message.type === "bot" ? "Robert AI" : "Vous"}
                      </span>
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="message-text">{message.content}</div>
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
                placeholder="Tapez votre message pour essayer Robert AI..."
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
            <div className="trial-notice">
              💡 Connectez-vous pour sauvegarder vos conversations et accéder à
              toutes les fonctionnalités !
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
