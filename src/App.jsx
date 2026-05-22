import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/layout/Header'
import BottomNavigation from './components/layout/BottomNavigation'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'

function AppContent() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'cart':      return <CartPage />
      case 'favorites': return <FavoritesPage />
      default:          return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Content area: top padding for header, bottom padding for nav */}
      <main className="flex-1 pt-[57px] pb-16 overflow-y-auto">
        {renderPage()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
