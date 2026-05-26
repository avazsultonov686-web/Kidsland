import { useEffect, useState } from 'react'

export function useTelegram() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    function readUser() {
      const tg = window.Telegram?.WebApp
      if (tg?.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
        tg.ready?.()
        tg.expand?.()
      }
    }

    readUser()
    const interval = setInterval(readUser, 100)
    const timeout = setTimeout(() => clearInterval(interval), 3000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return user
}

export function getTelegramWebApp() {
  return window.Telegram?.WebApp ?? null
}
