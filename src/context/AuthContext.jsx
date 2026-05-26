import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import { upsertUser, checkIsAdmin } from '../services/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const tgUser = useTelegram()
  const [dbUser, setDbUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const user = useMemo(() => {
    if (!tgUser) return null
    return {
      id: tgUser.id,
      firstName: tgUser.first_name || '',
      lastName: tgUser.last_name || '',
      username: tgUser.username || '',
      photoUrl: tgUser.photo_url || null,
      phone: dbUser?.phone || tgUser.phone_number || null,
    }
  }, [tgUser, dbUser])

  useEffect(() => {
    if (!tgUser?.id) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function init() {
      try {
        const [saved, admin] = await Promise.all([
          upsertUser({
            telegram_id: tgUser.id,
            first_name: tgUser.first_name,
            last_name: tgUser.last_name,
            username: tgUser.username,
          }),
          checkIsAdmin(tgUser.id),
        ])
        if (!cancelled) {
          setDbUser(saved)
          setIsAdmin(admin)
        }
      } catch {
        if (!cancelled) setIsAdmin(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    init()
    return () => { cancelled = true }
  }, [tgUser?.id])

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, tgUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
