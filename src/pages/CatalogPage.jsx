import { useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

const ALL_PRODUCTS = [
  { id: 1,  name: 'Коляска Bugaboo Fox 3',           price: 120, category: 'strollers' },
  { id: 2,  name: 'Автокресло Maxi-Cosi Pebble 360', price: 80,  category: 'carSeats' },
  { id: 3,  name: 'Развивающий коврик Fisher-Price',  price: 35,  category: 'toys' },
  { id: 4,  name: 'Кроватка-трансформер Woodi',       price: 150, category: 'furniture' },
  { id: 5,  name: 'Прыгунки Jolly Jumper',            price: 45,  category: 'toys' },
  { id: 6,  name: 'Велосипед 3-колёсный',             price: 60,  category: 'toys' },
  { id: 7,  name: 'Коляска Stokke Xplory X',          price: 140, category: 'strollers' },
  { id: 8,  name: 'Автокресло Britax Römer',          price: 95,  category: 'carSeats' },
  { id: 9,  name: 'Пирамидка деревянная',             price: 20,  category: 'development' },
  { id: 10, name: 'Кресло-качалка детское',           price: 55,  category: 'furniture' },
]

const CATEGORY_FILTER_KEYS = ['all', 'strollers', 'carSeats', 'toys', 'furniture', 'development']

export default function CatalogPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchCat = active === 'all' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <PageShell title={t('catalog')}>
      {/* Search */}
      <div className="relative mb-4">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pastel-inkmuted">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search')}
          className="w-full min-h-[48px] rounded-2xl border border-pastel-stroke bg-white py-3 pl-11 pr-4 text-[15px] font-medium text-pastel-ink placeholder:text-pastel-inkmuted/70 shadow-sm outline-none ring-2 ring-transparent transition-all focus:border-transparent focus:shadow-md focus:ring-[#c7d2fe99]"
        />
      </div>

      {/* Category filter pills */}
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 mb-5">
        {CATEGORY_FILTER_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              active === key
                ? 'bg-pastel-ink text-white shadow-sm'
                : 'bg-white text-pastel-inkmuted border border-pastel-stroke'
            }`}
          >
            {key === 'all' ? t('allCategories') : t(key)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-pastel-inkmuted">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <p className="text-sm font-medium">Ничего не найдено</p>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
