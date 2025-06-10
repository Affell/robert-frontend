import { useState, useEffect } from "react";
import { postFetch, getFetch, deleteFetch } from "../api/fetch";

export interface ChatSession {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface ChatMessage {
  id: number;
  user_message: string;
  bot_response: string;
  chat_session_id: number;
  created_at: string;
}

interface UseChatSessionsProps {
  token?: string;
  isAuthenticated: boolean;
}

export const useChatSessions = ({
  token,
  isAuthenticated,
}: UseChatSessionsProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer toutes les sessions
  const fetchSessions = async () => {
    if (!isAuthenticated || !token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getFetch("/chat/sessions", {
        "Robert-Connect-Token": token,
      });

      if (response.status === 200) {
        setSessions(response.data);
      } else if (response.status === 401) {
        setError("Authentication required");
      } else {
        setError("Erreur lors du chargement des sessions");
      }
    } catch (err) {
      console.error("Erreur lors du fetch des sessions:", err);
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Créer une nouvelle session
  const createSession = async (firstMessage: string) => {
    if (!isAuthenticated || !token) return null;

    try {
      setError(null);

      const response = await postFetch(
        "/chat/sessions",
        { first_message: firstMessage },
        { "Robert-Connect-Token": token }
      );

      if (response.status === 201) {
        const newSessionId = response.data.session_id;
        await fetchSessions(); // Rafraîchir la liste
        setCurrentSessionId(newSessionId);
        return newSessionId;
      } else if (response.status === 400) {
        setError("First message is required");
      } else if (response.status === 401) {
        setError("Authentication required");
      } else {
        setError("Erreur lors de la création de la session");
      }
    } catch (err) {
      console.error("Erreur lors de la création de session:", err);
      setError("Erreur de connexion");
    }
    return null;
  };

  // Supprimer une session
  const deleteSession = async (sessionId: number) => {
    if (!isAuthenticated || !token) return false;

    try {
      setError(null);

      const response = await deleteFetch(`/chat/sessions/${sessionId}`, {
        "Robert-Connect-Token": token,
      });

      if (response.status === 200) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        if (currentSessionId === sessionId) {
          setCurrentSessionId(null);
          setCurrentMessages([]);
        }
        return true;
      } else if (response.status === 400) {
        setError("Invalid session ID");
      } else if (response.status === 401) {
        setError("Authentication required");
      } else {
        setError("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de session:", err);
      setError("Erreur de connexion");
    }
    return false;
  };

  // Récupérer les messages d'une session
  const fetchSessionMessages = async (sessionId: number) => {
    if (!isAuthenticated || !token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getFetch(`/chat/sessions/${sessionId}/messages`, {
        "Robert-Connect-Token": token,
      });

      if (response.status === 200) {
        setCurrentMessages(response.data);
        setCurrentSessionId(sessionId);
      } else if (response.status === 400) {
        setError("Invalid session ID");
      } else if (response.status === 401) {
        setError("Authentication required");
      } else {
        setError("Erreur lors du chargement des messages");
      }
    } catch (err) {
      console.error("Erreur lors du fetch des messages:", err);
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un message à une session
  const addMessageToSession = async (
    sessionId: number,
    userMessage: string,
    botResponse: string
  ) => {
    if (!isAuthenticated || !token) return null;

    try {
      setError(null);

      const response = await postFetch(
        `/chat/sessions/${sessionId}/messages`,
        {
          user_message: userMessage,
          bot_response: botResponse,
        },
        { "Robert-Connect-Token": token }
      );

      if (response.status === 201) {
        // Rafraîchir les messages de la session courante
        if (currentSessionId === sessionId) {
          await fetchSessionMessages(sessionId);
        }
        return response.data.message_id;
      } else if (response.status === 400) {
        setError("Invalid session ID or missing fields");
      } else if (response.status === 401) {
        setError("Authentication required");
      } else if (response.status === 403) {
        setError("Session not found or access denied");
      } else {
        setError("Erreur lors de l'ajout du message");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de message:", err);
      setError("Erreur de connexion");
    }
    return null;
  };

  // Charger les sessions au démarrage
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchSessions();
    }
  }, [isAuthenticated, token]);

  return {
    sessions,
    currentSessionId,
    currentMessages,
    loading,
    error,
    fetchSessions,
    createSession,
    deleteSession,
    fetchSessionMessages,
    addMessageToSession,
    setCurrentSessionId,
  };
};
