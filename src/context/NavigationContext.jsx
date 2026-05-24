import { createContext, useCallback, useContext, useState } from 'react'

const NavigationContext = createContext(null)

export const ALL_PAGES = [
  'home', 'catalog', 'age', 'popular', 'promo',
  'favorites', 'delivery', 'support', 'about',
  'cart',
]

export function NavigationProvider({ children }) {
  const [page, setPage] = useState('home')

  const navigate = useCallback((to) => {
    if (ALL_PAGES.includes(to)) setPage(to)
  }, [])

  return (
    <NavigationContext.Provider value={{ page, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used inside NavigationProvider')
  return ctx
}
