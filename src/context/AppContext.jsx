import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchFavorites, addFavorite, removeFavorite } from '../services/users'
import { useAuth } from './AuthContext'

const AppContext = createContext(null)

const CART_KEY = 'kidslend_cart'
const LANG_KEY = 'kidslend_lang'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function AppProvider({ children }) {
  const { user } = useAuth()
  const [language, setLanguage] = useState(() => localStorage.getItem(LANG_KEY) || 'RU')
  const [cartItems, setCartItems] = useState(loadCart)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language)
  }, [language])

  useEffect(() => {
    if (!user?.id) {
      setFavorites([])
      return
    }
    fetchFavorites(user.id).then(setFavorites).catch(() => setFavorites([]))
  }, [user?.id])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'RU' ? 'TJ' : 'RU'))
  }, [])

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { ...product, qty }]
    })
  }, [])

  const updateCartQty = useCallback((productId, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) return prev.filter((item) => item.id !== productId)
      return prev.map((item) => (item.id === productId ? { ...item, qty } : item))
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const toggleFavorite = useCallback(async (productId) => {
    if (!user?.id) return
    const isFav = favorites.includes(productId)
    setFavorites((prev) =>
      isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
    try {
      if (isFav) await removeFavorite(user.id, productId)
      else await addFavorite(user.id, productId)
    } catch {
      setFavorites((prev) =>
        isFav ? [...prev, productId] : prev.filter((id) => id !== productId)
      )
    }
  }, [user?.id, favorites])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  )

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
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
