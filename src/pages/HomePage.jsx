import ProductCard from '../components/product/ProductCard'
import CategorySection from '../components/category/CategorySection'
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
    <div className="min-h-full bg-gradient-to-b from-[#faf9fc] via-pastel-cream to-[#f3f2f8] px-4 py-6">
      {/* Search */}
      <div className="relative mb-7">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pastel-inkmuted">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder={t('search')}
          className="
            min-h-[52px] w-full rounded-2xl border border-pastel-stroke bg-white py-3.5 pl-11 pr-4
            text-[15px] font-medium tracking-[-0.01em] text-pastel-ink placeholder:text-pastel-inkmuted/70
            shadow-[0_1px_3px_rgba(15,23,42,0.04)] outline-none ring-2 ring-transparent
            transition-[box-shadow,border-color,transform] duration-200 ease-out
            focus:border-transparent focus:shadow-[0_10px_40px_-16px_rgba(99,102,241,0.35)] focus:ring-[#c7d2fe99]
          "
        />
      </div>

      <CategorySection className="-mx-1" />

      <h3 className="mb-4 text-[17px] font-semibold tracking-[-0.02em] text-pastel-ink">
        {t('catalog')}
      </h3>

      <div className="grid grid-cols-2 gap-3 pb-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
