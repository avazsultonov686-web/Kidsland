import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/ui/Loader'
import { useProducts } from '../hooks/useProducts'
import { useTranslation } from '../hooks/useTranslation'
import { CATEGORIES } from '../lib/constants'

const BANNER_SLIDES = [
  { id: 1, bg: '#FFF8EE' },
  { id: 2, bg: '#EEF6FF' },
  { id: 3, bg: '#F0FFF4' },
]

const PERKS = [
  { icon: '🔄', key: 'perkReturn' },
  { icon: '🚚', key: 'perkDelivery' },
  { icon: '✅', key: 'perkQuality' },
  { icon: '😊', key: 'perkSupport' },
]

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const { data: products = [], isLoading } = useProducts({ sort: 'new' })

  const popular = products.slice(0, 8)

  return (
    <div className="min-h-full bg-[#faf9fc] pb-6">
      <div className="px-4 pt-4 mb-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="search"
            placeholder={t('search')}
            onFocus={() => navigate('/catalog')}
            className="min-h-[48px] w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-[15px] text-gray-700 placeholder:text-gray-400 shadow-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div className="px-4 mb-5">
        <div
          className="rounded-3xl min-h-[120px] p-5 flex flex-col justify-center relative overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: BANNER_SLIDES[slide].bg }}
        >
          <h2 className="text-[18px] font-bold text-gray-800 leading-tight">{t('heroTitle')}</h2>
          <p className="text-sm text-gray-600 mt-1">{t('heroSubtitle')}</p>
          <button
            onClick={() => navigate('/catalog')}
            className="mt-3 self-start bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-xl active:scale-95"
          >
            {t('catalog')}
          </button>
          <div className="flex gap-1.5 mt-4">
            {BANNER_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-4 bg-brand-red' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <section className="mb-5">
        <header className="mb-3 px-4">
          <h2 className="text-[17px] font-semibold text-pastel-ink">{t('categoryBrowse')}</h2>
          <p className="text-[12px] text-pastel-inkmuted/90">{t('categoryBrowseHint')}</p>
        </header>
        <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.id)}`)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 min-w-[3.94rem] active:scale-95"
            >
              <span
                style={{ backgroundColor: cat.bg }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm text-[26px]"
              >
                {cat.emoji}
              </span>
              <span className="text-[11px] font-semibold text-pastel-ink line-clamp-2 w-[73px] text-center">
                {t(cat.labelKey)}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 mb-5">
        <h2 className="text-[17px] font-bold text-gray-800 mb-3">{t('popularToday')}</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="px-4">
        <div className="grid grid-cols-4 gap-2">
          {PERKS.map(({ icon, key }) => (
            <div key={key} className="bg-white rounded-2xl p-2 shadow-sm text-center">
              <span className="text-xl">{icon}</span>
              <p className="text-[9px] font-medium text-gray-600 mt-1 leading-tight">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
