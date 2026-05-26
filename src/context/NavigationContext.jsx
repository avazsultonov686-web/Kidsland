import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [page, setPage] = useState('home')
  const [params, setParams] = useState({})

  const navigate = (newPage, newParams = {}) => {
    setPage(newPage)
    setParams(newParams)
  }

  return (
    <NavigationContext.Provider value={{ page, params, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}