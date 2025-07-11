import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, Plus } from "lucide-react";
import "./ChatHistory.css";

export interface ChatSession {
  id: string;
  title: string;
  timestamp: number;
  messageCount: number;
  preview: string;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onNewChat: () => void;
  currentSessionId?: string;
}

export default function ChatHistory({
  sessions,
  onSelectSession,
  onDeleteSession,
  onNewChat,
  currentSessionId,
}: ChatHistoryProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <div className="chat-history">
      {" "}
      <div className="chat-history-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          <Plus size={16} />
          Nouvelle conversation
        </button>{" "}
        <div className="search-container">
          <Search size={14} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="chat-sessions">
        <AnimatePresence>
          {filteredSessions.map((session) => (
            <motion.div
              key={session.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`chat-session ${
                session.id === currentSessionId ? "active" : ""
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              {" "}
              <div className="session-content">
                <h4 className="session-title">{session.title}</h4>
                <p className="session-preview">{session.preview}</p>
                <div className="session-meta">
                  <span className="session-time">
                    {formatTimestamp(session.timestamp)}
                  </span>
                </div>
              </div>
              <button
                className="delete-session-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSessions.length === 0 && (
          <div className="no-sessions">
            {searchTerm
              ? "Aucune conversation trouvée"
              : "Aucune conversation sauvegardée"}
          </div>
        )}
      </div>
    </div>
  );
}
