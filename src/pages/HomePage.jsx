import { useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import { useTranslation } from '../hooks/useTranslation'

const MOCK_PRODUCTS = [
  { id: 1, name: 'Коляска Bugaboo Fox 3', price: 120, category: 'Коляски',    image: null },
  { id: 2, name: 'Автокресло Maxi-Cosi Pebble 360', price: 80,  category: 'Автокресла', image: null },
  { id: 3, name: 'Развивающий коврик Fisher-Price', price: 35,  category: 'Игрушки',    image: null },
  { id: 4, name: 'Кроватка-трансформер Woodi', price: 150, category: 'Мебель',     image: null },
  { id: 5, name: 'Прыгунки Jolly Jumper',      price: 45,  category: 'Игрушки',    image: null },
  { id: 6, name: 'Детский велосипед 3-колёсный', price: 60, category: 'Игрушки',   image: null },
]

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="px-3 py-4">
      {/* Search bar */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder={t('search')}
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-blue transition-colors"
        />
      </div>

      {/* Category pills */}
      <CategoryPills />

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const PILL_COLORS = [
  { bg: '#E8312A', text: '#fff' },
  { bg: '#FF6B2B', text: '#fff' },
  { bg: '#F5C400', text: '#fff' },
  { bg: '#4CAF50', text: '#fff' },
  { bg: '#2196F3', text: '#fff' },
]

function CategoryPills() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const categories = ['allCategories', 'strollers', 'carSeats', 'toys', 'furniture']

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3 scrollbar-hide">
      {categories.map((cat, i) => (
        <button
          key={cat}
          onClick={() => setActive(i)}
          style={active === i ? { backgroundColor: PILL_COLORS[i].bg, color: PILL_COLORS[i].text } : {}}
          className={`
            flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95
            ${active === i ? 'shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}
          `}
        >
          {t(cat)}
        </button>
      ))}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
