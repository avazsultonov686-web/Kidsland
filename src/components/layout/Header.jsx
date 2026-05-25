import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useNavigation } from '../../context/NavigationContext'
import { useTranslation } from '../../hooks/useTranslation'
import KidsLendLogo from '../ui/KidsLendLogo'

const DRAWER_SECTIONS = [
  {
    items: [
      { page: 'home',      icon: '🏠', colorIdx: 0 },
      { page: 'catalog',   icon: '📦', colorIdx: 1 },
      { page: 'age',       icon: '👶', colorIdx: 2 },
      { page: 'popular',   icon: '⭐', colorIdx: 3 },
    ],
  },
  {
    items: [
      { page: 'favorites', icon: '❤️', colorIdx: 5 },
    ],
  },
  {
    items: [
      { page: 'delivery',  icon: '🚚', colorIdx: 0 },
      { page: 'support',   icon: '💬', colorIdx: 2 },
      { page: 'about',     icon: 'ℹ️', colorIdx: 3 },
    ],
  },
]

const MENU_COLORS = ['#E8312A', '#FF6B2B', '#4CAF50', '#F5C400', '#9B59B6', '#E8312A', '#2196F3']

export default function Header() {
  const { toggleLanguage } = useApp()
  const { t, language } = useTranslation()
  const { navigate, page: currentPage } = useNavigation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (page) => {
    navigate(page)
    setMenuOpen(false)
  }

  function ToggleItem({ icon, label }) {
    const [on, setOn] = useState(false)
    return (
      <div className="w-full px-5 py-3.5 flex items-center gap-3.5">
        <span className="text-[18px] w-7 text-center">{icon}</span>
        <span className="flex-1 text-[15px] font-medium text-gray-700">{label}</span>
        <button
          onClick={() => setOn(!on)}
          className={`w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-green-400' : 'bg-gray-200'}`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-sm mx-0.5 transition-transform duration-200 ${
              on ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    )
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-gray-700 active:scale-90 transition-transform rounded-xl"
            aria-label={t('menu')}
          >
            <BurgerIcon />
          </button>

          <button
            className="absolute left-1/2 -translate-x-1/2"
            onClick={() => handleNavigate('home')}
          >
            <KidsLendLogo className="h-14 w-auto object-contain" />
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

      {/* Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <nav className="relative z-10 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <KidsLendLogo className="h-24 w-auto object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 active:scale-90 transition-transform rounded-full"
                aria-label={t('close')}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Rainbow stripe */}
            <div className="flex h-[3px]">
              <div className="flex-1 bg-brand-red" />
              <div className="flex-1 bg-brand-orange" />
              <div className="flex-1 bg-brand-yellow" />
              <div className="flex-1 bg-brand-green" />
              <div className="flex-1 bg-brand-teal" />
              <div className="flex-1 bg-brand-blue" />
              <div className="flex-1 bg-brand-purple" />
            </div>

            {/* Menu sections */}
            <ul className="flex-1 overflow-y-auto py-2">
              {DRAWER_SECTIONS.map((section, si) => (
                <li key={si}>
                  {si > 0 && <div className="mx-5 my-1.5 h-px bg-gray-100" />}
                  <ul>
                    {section.items.map(({ page, icon, colorIdx }) => {
                      const isActive = currentPage === page
                      return (
                        <li key={page}>
                          <button
                            onClick={() => handleNavigate(page)}
                            className={`
                              w-full text-left px-5 py-3.5 flex items-center gap-3.5
                              text-[15px] font-medium transition-colors
                              ${isActive
                                ? 'bg-gray-50 text-pastel-ink font-semibold'
                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                              }
                            `}
                          >
                            <span className="text-[18px] w-7 text-center leading-none">{icon}</span>
                            <span className="flex-1">{t(page)}</span>
                            {isActive && (
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: MENU_COLORS[colorIdx] }}
                              />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Settings */}
            <div className="border-t border-gray-100 py-2">
              <ToggleItem icon="🌙" label="Тёмная тема" />
            
              <button
                onClick={() => handleNavigate('settings')}
                className="w-full text-left px-5 py-3.5 flex items-center gap-3.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
              >
                <span className="text-[18px] w-7 text-center">⚙️</span>
                <span className="flex-1">Настройки</span>
              </button>
            </div>

            {/* Footer */}
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
