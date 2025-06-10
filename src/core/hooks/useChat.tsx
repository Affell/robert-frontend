import { useState, useRef, useEffect } from "react";
import { postFetch } from "../api/fetch";
import { useChatSessions } from "./useChatSessions";

export interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface UseChatProps {
  isAuthenticated: boolean;
  token?: string;
  initialMessage?: string;
  sessionId?: number | null;
  onSessionCreated?: (sessionId: number) => void; // Callback pour notifier la création de session
}

export const useChat = ({
  isAuthenticated,
  token,
  initialMessage,
  sessionId,
  onSessionCreated,
}: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        initialMessage ||
        (isAuthenticated
          ? "Bienvenue dans Robert AI ! Vous avez accès à toutes les fonctionnalités : historique des conversations, paramètres personnalisés, et bien plus. Comment puis-je vous aider aujourd'hui ?"
          : "👋 Bonjour ! Je suis Robert, votre assistant IA. Essayez-moi gratuitement ! Pour accéder à toutes les fonctionnalités (historique, paramètres, etc.), connectez-vous."),
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [justCreatedSession, setJustCreatedSession] = useState(false); // Flag pour éviter le rechargement après création
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    addMessageToSession,
    currentMessages,
    fetchSessionMessages,
    createSession,
  } = useChatSessions({
    token,
    isAuthenticated,
  });

  // Convertir les messages de session en format Message local
  const convertSessionMessagesToLocal = () => {
    const convertedMessages: Message[] = [];

    currentMessages.forEach((msg) => {
      // Message utilisateur
      convertedMessages.push({
        id: `user-${msg.id}`,
        type: "user",
        content: msg.user_message,
        timestamp: new Date(msg.created_at),
      });

      // Réponse du bot
      convertedMessages.push({
        id: `bot-${msg.id}`,
        type: "bot",
        content: msg.bot_response,
        timestamp: new Date(msg.created_at),
      });
    });

    return convertedMessages;
  }; // Charger les messages de session si un sessionId est fourni
  useEffect(() => {
    if (isAuthenticated && token && sessionId && !justCreatedSession) {
      fetchSessionMessages(sessionId);
    } else if (isAuthenticated && sessionId === null) {
      // Nouvelle session - remettre les messages par défaut
      setMessages([
        {
          id: "1",
          type: "bot",
          content:
            "Bienvenue dans Robert AI ! Comment puis-je vous aider aujourd'hui ?",
          timestamp: new Date(),
        },
      ]);
    }

    // Réinitialiser le flag après le premier effet
    if (justCreatedSession) {
      setJustCreatedSession(false);
    }
  }, [sessionId, isAuthenticated, token, justCreatedSession]);

  // Mettre à jour les messages locaux quand les messages de session changent
  useEffect(() => {
    if (isAuthenticated && currentMessages.length > 0) {
      setMessages(convertSessionMessagesToLocal());
    }
  }, [currentMessages, isAuthenticated]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = async (userText: string) => {
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
      if (isAuthenticated && token) {
        // Appel API pour utilisateurs connectés
        const response = await postFetch(
          "/chat/query",
          {
            context: "website",
            query: userText,
            session_id: sessionId || undefined,
          },
          {
            "Robert-Connect-Token": token,
          }
        );

        if (response.status === 200) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: response.data.response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]); // Créer une session automatiquement si pas de session active
          let currentSession = sessionId;
          if (isAuthenticated && !sessionId) {
            const sessionTitle =
              userText.length > 50
                ? userText.substring(0, 47) + "..."
                : userText;
            const newSessionId = await createSession(sessionTitle);
            if (newSessionId && onSessionCreated) {
              currentSession = newSessionId;
              setJustCreatedSession(true); // Marquer qu'on vient de créer une session
              onSessionCreated(newSessionId);
            }
          }

          // Sauvegarder dans l'historique si on a un sessionId
          if (currentSession) {
            await addMessageToSession(
              currentSession,
              userText,
              response.data.response
            );
          }
        } else {
          throw new Error("Erreur API");
        }
      } else {
        // Appel API pour utilisateurs non connectés (mode démo)
        const response = await postFetch("/chat/query", {
          context: "website",
          query: userText,
        });

        if (response.status === 200) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: response.data.response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          throw new Error("Erreur API");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: isAuthenticated
          ? "Une erreur s'est produite lors de la communication avec le serveur. Veuillez réessayer."
          : "Une erreur s'est produite. En mode démonstration, certaines fonctionnalités peuvent être limitées. Connectez-vous pour une expérience complète.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    sendMessage(inputValue.trim());
  };
  return {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSubmit,
  };
};
