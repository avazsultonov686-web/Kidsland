import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useTranslation } from '../../hooks/useTranslation'

const NAV_ITEMS = [
  { path: '/', icon: HomeIcon, end: true, key: 'home' },
  { path: '/catalog', icon: GridIcon, key: 'catalog' },
  { path: '/cart', icon: CartIcon, badge: true, key: 'cart' },
  { path: '/favorites', icon: HeartIcon, key: 'favorites' },
]

export default function BottomNavigation() {
  const { cartCount } = useApp()
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ path, icon: Icon, badge, end, key }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) => `
              flex-1 flex flex-col items-center justify-center gap-0.5
              active:scale-95 transition-all duration-100
              ${isActive ? 'text-brand-red' : 'text-gray-400'}
            `}
            aria-label={t(key)}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon active={isActive} />
                  {badge && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[10px] font-bold leading-none rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-brand-red' : 'text-gray-400'}`}>
                  {t(key)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function GridIcon({ active }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function CartIcon({ active }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function HeartIcon({ active }) {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? '#E8312A' : 'none'} stroke={active ? '#E8312A' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}
