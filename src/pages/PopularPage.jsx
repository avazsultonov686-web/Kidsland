import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

const POPULAR_PRODUCTS = [
  { id: 1,  name: 'Коляска Bugaboo Fox 3',           price: 120, category: 'strollers',   rating: 4.9, orders: 214 },
  { id: 2,  name: 'Автокресло Maxi-Cosi Pebble 360', price: 80,  category: 'carSeats',    rating: 4.8, orders: 187 },
  { id: 5,  name: 'Прыгунки Jolly Jumper',            price: 45,  category: 'toys',        rating: 4.8, orders: 162 },
  { id: 7,  name: 'Коляска Stokke Xplory X',          price: 140, category: 'strollers',   rating: 4.7, orders: 148 },
  { id: 6,  name: 'Велосипед 3-колёсный',             price: 60,  category: 'toys',        rating: 4.7, orders: 131 },
  { id: 4,  name: 'Кроватка-трансформер Woodi',       price: 150, category: 'furniture',   rating: 4.6, orders: 119 },
]

export default function PopularPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('popular')}>
      {/* Top-3 podium */}
      <div className="mb-6 flex gap-2">
        {POPULAR_PRODUCTS.slice(0, 3).map((p, i) => (
          <div
            key={p.id}
            className={`flex-1 rounded-2xl p-3 flex flex-col gap-1 ${
              i === 0
                ? 'bg-gradient-to-br from-[#fff8e1] to-[#fde68a] ring-1 ring-[#fbbf2488]'
                : 'bg-white border border-pastel-stroke'
            }`}
          >
            <span className="text-lg font-black" style={{ color: MEDAL_COLORS[i] }}>
              {MEDALS[i]}
            </span>
            <p className="text-[11px] font-semibold text-pastel-ink leading-tight line-clamp-2">
              {p.name}
            </p>
            <p className="text-[11px] font-bold text-brand-red mt-auto">{p.price} {t('perDay')}</p>
            <p className="text-[10px] text-pastel-inkmuted">{p.orders} аренд</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {POPULAR_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  )
}

const MEDALS = ['🥇', '🥈', '🥉']
const MEDAL_COLORS = ['#d97706', '#6b7280', '#b45309']
