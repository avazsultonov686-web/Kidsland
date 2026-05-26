import { createContext, useCallback, useContext, useState } from 'react'

export const ALL_PAGES = [
  'home', 'catalog', 'age', 'popular',
  'favorites', 'delivery', 'support', 'about',
  'cart', 'product',
]

export function NavigationProvider({ children }) {
  const [page, setPage] = useState('home')
  const [params, setParams] = useState(null)
  const [product, setProduct] = useState(null)

  const navigate = useCallback((to, options) => {
    if (to === 'product') {
      setPage('product')
      setProduct(options?.product ?? null)
      setParams(options ?? null)
      return
    }
    if (ALL_PAGES.includes(to)) {
      setPage(to)
      setProduct(null)
      setParams(options ?? null)
    }
  }, [])

  return (
    <NavigationContext.Provider value={{ page, navigate, params, product }}>
      {children}
    </NavigationContext.Provider>
  )
}

const NavigationContext = createContext(null)

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used inside NavigationProvider')
  return ctx
}
