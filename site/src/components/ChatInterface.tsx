import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, MoreHorizontal, ArrowLeft, Menu, Settings } from 'lucide-react'
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

  // Charger les préférences au montage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('robert-ai-preferences')
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences)
      setUserPreferences(prefs)
      
      // Appliquer le thème
      if (prefs.theme === 'dark') {
        document.documentElement.classList.add('dark-theme')
      } else if (prefs.theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.classList.toggle('dark-theme', prefersDark)
      }
      
      // Appliquer la taille de police
      const sizes: Record<string, string> = { small: '14px', medium: '16px', large: '18px' }
      document.documentElement.style.setProperty('--base-font-size', sizes[prefs.fontSize])
    }
    
    // Charger l'historique
    const savedSessions = localStorage.getItem('robert-ai-sessions')
    if (savedSessions) {
      setChatSessions(JSON.parse(savedSessions))
    }
  }, [])

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const responses = [
        "C'est une excellente question ! Laissez-moi y réfléchir...",
        "Je comprends votre demande. Voici ce que je peux vous dire à ce sujet...",
        "Intéressant ! Basé sur votre question, je recommande...",
        "Merci pour cette question. Voici mon analyse...",
        "C'est un sujet fascinant. Permettez-moi de vous expliquer...",
        "Excellente question ! Pour vous donner une réponse complète...",
        "Je vois ce que vous voulez dire. Dans ce contexte...",
        "C'est un point très pertinent. Voici ce que je peux vous dire..."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: randomResponse + " " + `Concernant "${userMessage}", voici ma réponse détaillée qui devrait vous aider à mieux comprendre le sujet.`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      
      // Mettre à jour la session actuelle
      updateCurrentSession(userMessage, botMessage)
    }, 1000 + Math.random() * 2000)
  }

  const updateCurrentSession = (userMessage: string, _botMessage: Message) => {
    setChatSessions(prev => {
      const updated = prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messageCount: session.messageCount + 2,
            preview: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''),
            timestamp: Date.now()
          }
        }
        return session
      })
      
      // Sauvegarder dans localStorage
      localStorage.setItem('robert-ai-sessions', JSON.stringify(updated))
      return updated
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    simulateBotResponse(userMessage.content)
  }

  const handleNewChat = () => {
    const newSessionId = Date.now().toString()
    const newSession: ChatSession = {
      id: newSessionId,
      title: `Conversation ${chatSessions.length + 1}`,
      timestamp: Date.now(),
      messageCount: 1,
      preview: "Nouvelle conversation..."
    }
    
    setChatSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newSessionId)
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Bonjour ! Je suis Robert, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
        timestamp: new Date()
      }
    ])
    setShowHistory(false)
  }

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId)
    // Dans une vraie application, on chargerait les messages de cette session
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Conversation restaurée. Comment puis-je vous aider ?",
        timestamp: new Date()
      }
    ])
    setShowHistory(false)
  }

  const handleDeleteSession = (sessionId: string) => {
    if (sessionId === currentSessionId && chatSessions.length > 1) {
      // Passer à une autre session
      const otherSession = chatSessions.find(s => s.id !== sessionId)
      if (otherSession) {
        setCurrentSessionId(otherSession.id)
      }
    }
    
    setChatSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId)
      localStorage.setItem('robert-ai-sessions', JSON.stringify(updated))
      return updated
    })
  }

  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    const updated = { ...userPreferences, ...newPrefs }
    setUserPreferences(updated)
    localStorage.setItem('robert-ai-preferences', JSON.stringify(updated))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`chat-interface ${showHistory ? 'with-history' : ''}`}>
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
            {onBack && (
              <button className="back-button" onClick={onBack}>
                <ArrowLeft size={20} />
              </button>
            )}
            <button 
              className="history-toggle"
              onClick={() => setShowHistory(!showHistory)}
            >
              <Menu size={20} />
            </button>
            <div className="chat-title">
              <h2>Robert AI</h2>
              <span className="status">En ligne</span>
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
                  {message.type === 'bot' ? (
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
                  <div className="message-header">
                    <span className="message-sender">
                      {message.type === 'bot' ? 'Robert AI' : userPreferences.username}
                    </span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-text">
                    {message.content}
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
  )
}
