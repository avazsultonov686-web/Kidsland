import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useTranslation } from '../../hooks/useTranslation'
import KidsLendLogo from '../ui/KidsLendLogo'

export default function Header() {
  const { toggleLanguage } = useApp()
  const { t, language } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { key: 'allCategories' },
    { key: 'strollers' },
    { key: 'carSeats' },
    { key: 'toys' },
    { key: 'furniture' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Burger menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-gray-700 active:scale-90 transition-transform rounded-xl"
            aria-label={t('menu')}
          >
            <BurgerIcon />
          </button>

          {/* Real logo — centered absolutely so it doesn't affect flex layout */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <KidsLendLogo className="h-10 w-auto object-contain" />
          </div>

          {/* Language switcher */}
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

        {/* Rainbow stripe matching logo colors */}
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

      {/* Slide-in drawer menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="relative z-10 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col">
            {/* Drawer header with logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <KidsLendLogo className="h-10 w-auto object-contain" />
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

            {/* Menu items */}
            <ul className="flex-1 overflow-y-auto py-3">
              {menuItems.map(({ key }, i) => (
                <li key={key}>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-5 py-3.5 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center gap-3"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: MENU_COLORS[i % MENU_COLORS.length] }}
                    />
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tagline at bottom */}
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

const MENU_COLORS = ['#E8312A', '#FF6B2B', '#F5C400', '#4CAF50', '#00B4B4', '#2196F3', '#9B59B6']

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
