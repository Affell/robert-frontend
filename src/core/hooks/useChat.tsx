import { useState, useRef, useEffect } from "react";
import { postFetch } from "../api/fetch";

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
}

export const useChat = ({
  isAuthenticated,
  token,
  initialMessage,
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          setMessages((prev) => [...prev, botMessage]);
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
