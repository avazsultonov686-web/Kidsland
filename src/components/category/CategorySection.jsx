import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const CATEGORY_CONFIG = [
  { id: 'all',                  labelKey: 'allCategories',  emoji: '🏠', bg: '#FFE8E8' },
  { id: 'Конструкторы',         labelKey: 'catConstructors', emoji: '🧱', bg: '#FFE8D6' },
  { id: 'Мягкие игрушки',       labelKey: 'catSoftToys',    emoji: '🧸', bg: '#FFF0D6' },
  { id: 'Радиоуправляемые',     labelKey: 'catRemote',      emoji: '🎮', bg: '#E8F5E8' },
  { id: 'Машинки',              labelKey: 'catCars',        emoji: '🚗', bg: '#E8F0FF' },
  { id: 'Коляски и самокаты',   labelKey: 'catStrollers',   emoji: '🛴', bg: '#F0E8FF' },
  { id: 'Мебель детская',       labelKey: 'catFurniture',   emoji: '🛏', bg: '#E8FFF0' },
  { id: 'Куклы',                labelKey: 'catDolls',       emoji: '🪆', bg: '#FFE8F5' },
  { id: 'Наборы принцесс',      labelKey: 'catPrincess',    emoji: '👑', bg: '#FFF8E8' },
]

export default function CategorySection({ className = '', onSelect }) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(null)

  return (
    <section aria-label={t('categoryBrowse')} className={`mb-5 ${className}`}>
      <header className="mb-3 flex flex-col gap-0.5 px-4">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-pastel-ink">
          {t('categoryBrowse')}
        </h2>
        <p className="text-[12px] font-medium leading-snug text-pastel-inkmuted/90">
          {t('categoryBrowseHint')}
        </p>
      </header>

      <div
        className="scrollbar-none flex touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-4 pb-2 pt-0.5 [-webkit-overflow-scrolling:touch]"
        role="list"
      >
        {CATEGORY_CONFIG.map((cat) => {
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
              className="group flex min-w-[3.94rem] max-w-[4.3rem] flex-shrink-0 snap-start flex-col items-center gap-1.5 text-center outline-none transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.96] sm:hover:scale-[1.015]"
            >
              <span
                style={{ backgroundColor: cat.bg }}
                className={`
                  relative flex h-[64px] w-[64px] items-center justify-center rounded-2xl
                  shadow-sm ring-1 ring-white/70 transition-[transform,box-shadow] duration-300 ease-out
                  ${pressed ? 'shadow-md' : 'shadow-sm'}
                  group-active:shadow-md
                `}
              >
                <span className="text-[26px] leading-none select-none">{cat.emoji}</span>
              </span>
              <span className="line-clamp-2 w-[73px] text-[11px] font-semibold leading-tight tracking-[-0.01em] text-pastel-ink">
                {t(cat.labelKey)}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
