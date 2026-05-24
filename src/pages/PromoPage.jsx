import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

const PROMO_BANNERS = [
  {
    id: 'summer',
    title: 'Летняя аренда',
    subtitle: 'Скидка 20% на коляски июнь-август',
    from: '#fce8ef',
    to: '#ffe4e1',
    accent: '#e11d48',
    badge: '−20%',
  },
  {
    id: 'first',
    title: 'Первый заказ',
    subtitle: 'Скидка 15% для новых клиентов',
    from: '#e4f2ff',
    to: '#dbeafe',
    accent: '#2563eb',
    badge: '−15%',
  },
  {
    id: 'week',
    title: 'Аренда от 7 дней',
    subtitle: 'Платите за 6 — получайте 7',
    from: '#e4f7ef',
    to: '#d1fae5',
    accent: '#059669',
    badge: '+1 день',
  },
]

const PROMO_PRODUCTS = [
  { id: 3,  name: 'Развивающий коврик Fisher-Price', price: 29,  category: 'toys',      originalPrice: 35 },
  { id: 6,  name: 'Велосипед 3-колёсный',            price: 48,  category: 'toys',      originalPrice: 60 },
  { id: 10, name: 'Кресло-качалка детское',          price: 44,  category: 'furniture', originalPrice: 55 },
  { id: 9,  name: 'Пирамидка деревянная',            price: 15,  category: 'development', originalPrice: 20 },
]

export default function PromoPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('promo')}>
      {/* Promo banners */}
      <div className="flex flex-col gap-3 mb-7">
        {PROMO_BANNERS.map((b) => (
          <div
            key={b.id}
            className="relative overflow-hidden rounded-3xl p-5"
            style={{ background: `linear-gradient(135deg, ${b.from}, ${b.to})` }}
          >
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[28px] font-black tabular-nums"
              style={{ color: b.accent }}
            >
              {b.badge}
            </span>
            <p className="text-[15px] font-bold text-pastel-ink pr-20">{b.title}</p>
            <p className="mt-0.5 text-[13px] text-pastel-inkmuted pr-20 leading-snug">{b.subtitle}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-[17px] font-semibold tracking-tight text-pastel-ink">Товары со скидкой</h2>

      <div className="grid grid-cols-2 gap-3">
        {PROMO_PRODUCTS.map((p) => (
          <div key={p.id} className="relative">
            <ProductCard product={p} />
            {p.originalPrice && (
              <span className="absolute top-2 right-2 z-10 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
                −{Math.round((1 - p.price / p.originalPrice) * 100)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  )
}
