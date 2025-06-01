import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, MoreHorizontal, ArrowLeft, Menu, Settings, History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatHistory, ChatSession } from './ChatHistory'
import { UserSettings, UserPreferences } from './UserSettings'
import './ChatInterface.css'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, MoreHorizontal, ArrowLeft, Menu, Settings, History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatHistory, type ChatSession } from './ChatHistory'
import { UserSettings, type UserPreferences } from './UserSettings'
import './ChatInterface.css'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  onBack?: () => void
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  // États existants
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Bonjour ! Je suis Robert, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // Nouveaux états pour les fonctionnalités
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState('default')
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: 'default',
      title: 'Conversation actuelle',
      timestamp: Date.now(),
      messageCount: 1,
      preview: "Bonjour ! Je suis Robert, votre assistant IA..."
    }
  ])
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: 'light',
    fontSize: 'medium',
    language: 'fr',
    username: 'Utilisateur',
    avatarColor: '#f97316'
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const responses = [
        "C'est une excellente question ! Laissez-moi y réfléchir...",
        "Je comprends votre demande. Voici ce que je peux vous dire à ce sujet...",
        "Intéressant ! Basé sur votre question, je recommande...",
        "Merci pour cette question. Voici mon analyse...",
        "C'est un sujet fascinant. Permettez-moi de vous expliquer..."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const fullResponse = `${randomResponse} 

En réponse à "${userMessage}", je peux vous aider avec des informations détaillées. Mon rôle est de vous assister de manière intelligente et personnalisée.

Avez-vous d'autres questions ?`

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: fullResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    simulateBotResponse(inputValue)
    setInputValue('')
    inputRef.current?.focus()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="chat-interface">
      <div className="container">
        {/* Header du chat */}
        <div className="chat-header">
          <div className="chat-header-info">
            {onBack && (
              <button className="btn btn-ghost chat-back-btn" onClick={onBack}>
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="bot-avatar">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="chat-title">Robert AI</h2>
              <p className="chat-status">En ligne • Répond généralement en quelques secondes</p>
            </div>
          </div>
          
          <button className="btn btn-ghost">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Zone des messages */}
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
              >
                <div className="message-avatar">
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p className="message-text">{message.content}</p>
                  </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Indicateur de frappe */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="message message-bot"
            >
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tapez votre message..."
              className="chat-input"
              autoFocus
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="chat-disclaimer">
            Robert peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </form>
      </div>
    </div>
  )
}
