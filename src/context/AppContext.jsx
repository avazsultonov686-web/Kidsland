import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('RU')
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'RU' ? 'TJ' : 'RU'))
  }

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
