import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const CATEGORY_CONFIG = [
  {
    id: 'toys',
    labelKey: 'toys',
    cardClass:
      'bg-gradient-to-br from-[#fce8ef] via-pastel-rose to-[#f5dae8] shadow-[0_10px_30px_-12px_rgba(236,72,153,0.28)] ring-1 ring-white/70',
    shadowIcon: '#ec489955',
    Icon: IconToys,
  },
  {
    id: 'strollers',
    labelKey: 'strollers',
    cardClass:
      'bg-gradient-to-br from-[#fff0e6] via-pastel-peach to-[#ffe4cc] shadow-[0_10px_30px_-12px_rgba(251,146,60,0.25)] ring-1 ring-white/70',
    shadowIcon: '#fb923c55',
    Icon: IconStroller,
  },
  {
    id: 'car-seats',
    labelKey: 'carSeats',
    cardClass:
      'bg-gradient-to-br from-[#e9fbf3] via-pastel-mint to-[#d4f0e5] shadow-[0_10px_30px_-12px_rgba(16,185,129,0.22)] ring-1 ring-white/70',
    shadowIcon: '#10b98144',
    Icon: IconCarSeat,
  },
  {
    id: 'furniture',
    labelKey: 'furniture',
    cardClass:
      'bg-gradient-to-br from-[#eef5ff] via-pastel-sky to-[#ddeaff] shadow-[0_10px_30px_-12px_rgba(59,130,246,0.22)] ring-1 ring-white/70',
    shadowIcon: '#3b82f655',
    Icon: IconFurniture,
  },
  {
    id: 'development',
    labelKey: 'development',
    cardClass:
      'bg-gradient-to-br from-[#f2edfc] via-pastel-lilac to-[#e6def9] shadow-[0_10px_30px_-12px_rgba(167,139,250,0.28)] ring-1 ring-white/70',
    shadowIcon: '#a78bfa55',
    Icon: IconDevelopment,
  },
]

/**
 * Horizontal premium category carousel for Telegram Mini App.
 * Pastel Apple / kids-app aesthetics, rounded-3xl (24px) cards.
 */
export default function CategorySection({ className = '', onSelect }) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(null)

  return (
    <section
      aria-label={t('categoryBrowse')}
      className={`mb-8 ${className}`}
    >
      <header className="mb-5 flex flex-col gap-1 px-0">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-pastel-ink">
          {t('categoryBrowse')}
        </h2>
        <p className="text-[13px] font-medium leading-snug text-pastel-inkmuted/90">
          {t('categoryBrowseHint')}
        </p>
      </header>

      <div
        className={`
          scrollbar-none flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth
          pb-3 pl-1 pr-1 pt-1
          [-webkit-overflow-scrolling:touch]
        `}
        role="list"
      >
        {CATEGORY_CONFIG.map((cat) => {
          const { Icon } = cat
          const pressed = activeId === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              role="listitem"
              aria-pressed={pressed}
              onPointerDown={() => setActiveId(cat.id)}
              onPointerUp={() => setActiveId(null)}
              onPointerLeave={() => setActiveId(null)}
              onPointerCancel={() => setActiveId(null)}
              onClick={() => onSelect?.(cat.id)}
              className={`
                group flex min-w-[5.625rem] max-w-[6.125rem] flex-shrink-0 snap-start flex-col items-center
                gap-2.5 text-center outline-none transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                active:scale-[0.96] sm:hover:scale-[1.015]
              `}
            >
              <span
                className={`
                  relative flex h-[92px] w-[92px] items-center justify-center rounded-3xl
                  shadow-sm transition-[transform,box-shadow] duration-300 ease-out
                  ${cat.cardClass}
                  ${pressed ? 'shadow-md' : 'shadow-sm'}
                  group-active:shadow-md
                `}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[10%] rounded-2xl bg-white/35 blur-xl"
                />
                <span
                  className="relative flex h-full w-full items-center justify-center p-3 [&_svg]:h-[72px] [&_svg]:w-[72px]"
                >
                  <Icon dropShadow={cat.shadowIcon} />
                </span>
              </span>
              <span
                className="line-clamp-2 w-[104px] text-[13px] font-semibold leading-tight tracking-[-0.01em] text-pastel-ink transition-colors duration-200 group-hover:text-pastel-ink"
              >
                {t(cat.labelKey)}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function IconToys({ dropShadow }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 8px 12px ${dropShadow})` }}>
      <defs>
        <linearGradient id="toy-ball" x1="24" y1="26" x2="58" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="toy-star" x1="54" y1="40" x2="78" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="toy-cube-a" x1="28" y1="58" x2="62" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="44" r="18" fill="url(#toy-ball)" />
      <path
        d="M64 54l10-6 4 13-13 8-13-9 12-8Z"
        fill="url(#toy-star)"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.95"
      />
      <path
        d="M34 72l22-14 22 14-22 12-22-12Z"
        fill="url(#toy-cube-a)"
      />
      <path d="M34 72 56 62l22 10-22 12V72Z" fill="#facc15cc" opacity="0.92" />
      <path d="M56 62V50l22 22-22 10V62Z" fill="#fcd34daa" opacity="0.95" />
    </svg>
  )
}

function IconStroller({ dropShadow }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 8px 12px ${dropShadow})` }}>
      <defs>
        <linearGradient id="st-metal" x1="24" y1="24" x2="74" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="st-body" x1="40" y1="42" x2="42" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fca5a5" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="76" r="10" stroke="#fcd34dcc" strokeWidth="4.5" fill="#fffefc" />
      <circle cx="66" cy="76" r="10" stroke="#fcd34dcc" strokeWidth="4.5" fill="#fffefc" />
      <path d="M32 74V46c0-16 34-26 42-26" stroke="#fb923cdd" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 62h38V44l-38 18z" fill="url(#st-body)" />
      <path d="M50 62h38V52H50z" fill="#ffffff77" />
      <path d="M50 62c-14-14-26-46-34-62" stroke="url(#st-metal)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="18" cy="60" r="5" fill="#fcd34dff" opacity="0.95" />
    </svg>
  )
}

function IconCarSeat({ dropShadow }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 8px 12px ${dropShadow})` }}>
      <defs>
        <linearGradient id="carshell" x1="24" y1="20" x2="74" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7dd3a9" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="carside" x1="34" y1="34" x2="78" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#cfead8" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path
        d="M28 74V44l18-22h22l16 26v26H28Z"
        fill="url(#carshell)"
      />
      <path
        d="M62 74V54l22-38h8l4 58H62Z"
        fill="url(#carside)"
      />
      <ellipse cx="40" cy="38" rx="16" ry="12" fill="#bbf7d0" opacity="0.92" />
      <path d="M32 74V56l18-34" stroke="#fff" strokeOpacity="0.45" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M66 74V58l22-54" stroke="#fff" strokeOpacity="0.38" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="64" cy="74" rx="26" ry="6" fill="#000000" fillOpacity="0.09" />
    </svg>
  )
}

function IconFurniture({ dropShadow }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 8px 12px ${dropShadow})` }}>
      <defs>
        <linearGradient id="furn-front" x1="22" y1="74" x2="72" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#cfe3ff" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient id="furn-top" x1="22" y1="50" x2="72" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eaf2ff" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M22 74V38l52-26v62H22z" fill="url(#furn-front)" />
      <path d="M22 38l52-26 22 12-52 26-22-12z" fill="url(#furn-top)" />
      <path d="M74 24v50" stroke="#bfdbfe" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 58h36" stroke="#ffffff99" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 66h36" stroke="#ffffff66" strokeWidth="3" strokeLinecap="round" />
      <circle cx="34" cy="46" r="3" fill="#60a5fa" />
      <circle cx="46" cy="46" r="3" fill="#60a5fa" />
      <circle cx="58" cy="46" r="3" fill="#60a5fa" />
    </svg>
  )
}

function IconDevelopment({ dropShadow }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 8px 12px ${dropShadow})` }}>
      <defs>
        <linearGradient id="dev-a" x1="18" y1="28" x2="44" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ede9fe" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="dev-b" x1="48" y1="24" x2="78" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fce7f3" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="dev-c" x1="28" y1="46" x2="78" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#cffafe" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="18" y="26" width="34" height="34" rx="10" fill="url(#dev-a)" transform="rotate(-9 35 43)" />
      {/* Sparkles / learning motif */}
      <path
        d="M35 54V38M42 54V42M29 44h26"
        stroke="#5b21b6"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <rect x="48" y="20" width="34" height="34" rx="10" fill="url(#dev-b)" transform="rotate(8 65 37)" />
      <circle cx="64" cy="38" r="8" stroke="#9f1239" strokeWidth="4.5" fill="none" />
      <circle cx="64" cy="38" r="4" fill="#fbcfe8" />
      <rect x="28" y="46" width="46" height="28" rx="10" fill="url(#dev-c)" transform="rotate(-4 51 60)" />
      <circle cx="44" cy="60" r="4" fill="#0891b2" />
      <circle cx="52" cy="60" r="4" fill="#0891b2" />
      <circle cx="60" cy="60" r="4" fill="#0891b2" />
    </svg>
  )
}
