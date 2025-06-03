import { useState } from 'react'
import { Header, ChatInterface, Hero, Footer, About, Pricing } from './components'
import './App.css'

type AppView = 'home' | 'chat' | 'about' | 'pricing'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Hero onStartChat={() => setCurrentView('chat')} />
      case 'chat':
        return <ChatInterface onBack={() => setCurrentView('home')} />
      case 'about':
        return <About onBack={() => setCurrentView('home')} />
      case 'pricing':
        return <Pricing onStartChat={() => setCurrentView('chat')} />
      default:
        return <Hero onStartChat={() => setCurrentView('chat')} />
    }
  }

  return (
    <div className="app">      {currentView !== 'chat' && (
        <Header 
          onChatToggle={() => setCurrentView('chat')} 
          onAboutClick={() => setCurrentView('about')}
          onPricingClick={() => setCurrentView('pricing')}
          onLogoClick={() => setCurrentView('home')}
        />
      )}
      <main>
        {renderView()}
      </main>
      {(currentView === 'home' || currentView === 'pricing') && <Footer />}
    </div>
  )
}

export default App
