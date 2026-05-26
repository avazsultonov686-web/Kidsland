import { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'
import { fetchProducts } from '../services/products'

const CATEGORIES = [
  { key: 'all', label: 'Все' },
  { key: 'Конструкторы', label: 'Конструкторы' },
  { key: 'Мягкие игрушки', label: 'Мягкие игрушки' },
  { key: 'Радиоуправляемые', label: 'Радиоуправляемые' },
  { key: 'Машинки', label: 'Машинки' },
  { key: 'Коляски и самокаты', label: 'Коляски и самокаты' },
  { key: 'Мебель детская', label: 'Мебель детская' },
  { key: 'Куклы', label: 'Куклы' },
  { key: 'Наборы принцесс', label: 'Наборы принцесс' },
]

export default function CatalogPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(data => { if (data) setProducts(data) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) => {
    const matchCat = active === 'all' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <PageShell title={t('catalog')}>
      {/* Search */}
      <div className="relative mb-4">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search')}
          className="w-full min-h-[48px] rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-[15px] text-gray-700 placeholder:text-gray-400 shadow-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
        />
      </div>

      {/* Category filter */}
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 mb-5">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              active === key
                ? 'bg-[#E8312A] text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-gray-400 text-sm">
          Загрузка...
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={{ ...p, image: p.image_url }} />
          ))}
        </div>
      )}
    </PageShell>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <p className="text-sm font-medium">Ничего не найдено</p>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}