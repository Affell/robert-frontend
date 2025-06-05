import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, Plus } from "lucide-react";
import { useChatSessions } from "../../core/hooks/useChatSessions";
import "./ChatHistoryAPI.css";

interface ChatHistoryAPIProps {
  token?: string;
  isAuthenticated: boolean;
  currentSessionId?: number | null;
  onSelectSession: (sessionId: number) => void;
  onNewChat: () => void;
}

export default function ChatHistoryAPI({
  token,
  isAuthenticated,
  currentSessionId,
  onSelectSession,
  onNewChat,
}: ChatHistoryAPIProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { sessions, loading, error, deleteSession, createSession } =
    useChatSessions({
      token,
      isAuthenticated,
    });

  const filteredSessions = (sessions || []).filter((session) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  const handleNewChat = async () => {
    // Créer une nouvelle session avec un message initial
    const sessionId = await createSession("Nouvelle conversation");
    if (sessionId) {
      onNewChat();
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    await deleteSession(sessionId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="chat-history-api">
      <div className="chat-history-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <Plus size={16} />
          Nouvelle conversation
        </button>

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
        {loading && (
          <div className="loading-sessions">
            <div className="loading-spinner"></div>
            <p>Chargement des conversations...</p>
          </div>
        )}

        {error && (
          <div className="error-sessions">
            <p>❌ {error}</p>
          </div>
        )}

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
              <div className="session-content">
                <h4 className="session-title">{session.title}</h4>
                <div className="session-meta">
                  <span className="session-time">
                    {formatTimestamp(session.created_at)}
                  </span>
                </div>
              </div>
              <button
                className="delete-session-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSession(session.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && filteredSessions.length === 0 && (
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
