import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from '../../hooks/useTranslation'
import KidsLendLogo from '../ui/KidsLendLogo'

const DRAWER_SECTIONS = [
  {
    items: [
      { path: '/', icon: '🏠', colorIdx: 0, key: 'home' },
      { path: '/catalog', icon: '📦', colorIdx: 1, key: 'catalog' },
      { path: '/profile', icon: '👤', colorIdx: 2, key: 'profile' },
    ],
  },
  {
    items: [
      { path: '/favorites', icon: '❤️', colorIdx: 5, key: 'favorites' },
      { path: '/orders', icon: '📋', colorIdx: 3, key: 'orders' },
    ],
  },
  {
    items: [
      { path: '/delivery', icon: '🚚', colorIdx: 0, key: 'delivery' },
      { path: '/support', icon: '💬', colorIdx: 2, key: 'support' },
      { path: '/about', icon: 'ℹ️', colorIdx: 3, key: 'about' },
    ],
  },
]

const MENU_COLORS = ['#E8312A', '#FF6B2B', '#4CAF50', '#F5C400', '#9B59B6', '#E8312A', '#2196F3']

export default function Header() {
  const { toggleLanguage } = useApp()
  const { isAdmin } = useAuth()
  const { t, language } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-gray-700 active:scale-90 transition-transform rounded-xl"
            aria-label={t('menu')}
          >
            <BurgerIcon />
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm font-bold active:scale-95 transition-transform"
            aria-label="Switch language"
          >
            <span className={language === 'RU' ? 'text-brand-red' : 'text-gray-400'}>RU</span>
            <span className="text-gray-300 font-light">|</span>
            <span className={language === 'TJ' ? 'text-brand-blue' : 'text-gray-400'}>TJ</span>
          </button>
        </div>

        <div className="flex h-[3px]">
          <div className="flex-1 bg-brand-red" />
          <div className="flex-1 bg-brand-orange" />
          <div className="flex-1 bg-brand-yellow" />
          <div className="flex-1 bg-brand-green" />
          <div className="flex-1 bg-brand-teal" />
          <div className="flex-1 bg-brand-blue" />
          <div className="flex-1 bg-brand-purple" />
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="relative z-10 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <KidsLendLogo className="h-16 w-auto object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 active:scale-90 transition-transform rounded-full"
                aria-label={t('close')}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex h-[3px]">
              <div className="flex-1 bg-brand-red" />
              <div className="flex-1 bg-brand-orange" />
              <div className="flex-1 bg-brand-yellow" />
              <div className="flex-1 bg-brand-green" />
              <div className="flex-1 bg-brand-teal" />
              <div className="flex-1 bg-brand-blue" />
              <div className="flex-1 bg-brand-purple" />
            </div>

            <ul className="flex-1 overflow-y-auto py-2">
              {DRAWER_SECTIONS.map((section, si) => (
                <li key={si}>
                  {si > 0 && <div className="mx-5 my-1.5 h-px bg-gray-100" />}
                  <ul>
                    {section.items.map(({ path, icon, colorIdx, key }) => (
                      <li key={path}>
                        <Link
                          to={path}
                          onClick={() => setMenuOpen(false)}
                          className="w-full text-left px-5 py-3.5 flex items-center gap-3.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                          <span className="text-[18px] w-7 text-center leading-none">{icon}</span>
                          <span className="flex-1">{t(key)}</span>
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0 opacity-40"
                            style={{ backgroundColor: MENU_COLORS[colorIdx] }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              {isAdmin && (
                <li>
                  <div className="mx-5 my-1.5 h-px bg-gray-100" />
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-5 py-3.5 flex items-center gap-3.5 text-[15px] font-medium text-brand-red hover:bg-gray-50"
                  >
                    <span className="text-[18px] w-7 text-center">⚙️</span>
                    <span className="flex-1">{t('admin')}</span>
                  </Link>
                </li>
              )}
            </ul>

            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center italic">
                Игрушки для счастливого детства
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

function BurgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="0" y1="2" x2="22" y2="2" />
      <line x1="0" y1="8" x2="22" y2="8" />
      <line x1="0" y1="14" x2="22" y2="14" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="1" y1="1" x2="17" y2="17" />
      <line x1="17" y1="1" x2="1" y2="17" />
    </svg>
  )
}
