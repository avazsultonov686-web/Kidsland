import { CATEGORIES } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'

export default function ProductFilter({
  category,
  onCategoryChange,
  search,
  onSearchChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  ageMin,
  ageMax,
  onAgeMinChange,
  onAgeMaxChange,
  sort,
  onSortChange,
  maxPrice = 50000,
}) {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 mb-4">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('search')}
          className="min-h-[48px] w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-[15px] shadow-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <Pill active={!category} onClick={() => onCategoryChange('')}>
          {t('allCategories')}
        </Pill>
        {CATEGORIES.map((cat) => (
          <Pill
            key={cat.id}
            active={category === cat.id}
            onClick={() => onCategoryChange(cat.id)}
          >
            {t(cat.labelKey)}
          </Pill>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-500">{t('priceFrom')} — {t('priceTo')}</label>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceMin}
              onChange={(e) => {
                const v = Number(e.target.value)
                onPriceMinChange(v)
                if (v > priceMax) onPriceMaxChange(v)
              }}
              className="flex-1 accent-brand-red"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => {
                const v = Number(e.target.value)
                onPriceMaxChange(v)
                if (v < priceMin) onPriceMinChange(v)
              }}
              className="flex-1 accent-brand-red"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {priceMin.toLocaleString()} — {priceMax.toLocaleString()} сом
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500">{t('ageFilter')}</label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              min={0}
              max={18}
              value={ageMin}
              onChange={(e) => onAgeMinChange(Number(e.target.value))}
              className="w-20 rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
            <span className="self-center text-gray-400">—</span>
            <input
              type="number"
              min={0}
              max={18}
              value={ageMax}
              onChange={(e) => onAgeMaxChange(Number(e.target.value))}
              className="w-20 rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
            <span className="self-center text-xs text-gray-400">{t('ageYears')}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {[
            { key: 'cheap', label: t('sortCheap') },
            { key: 'expensive', label: t('sortExpensive') },
            { key: 'new', label: t('sortNew') },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onSortChange(key)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                sort === key
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'bg-brand-red text-white shadow-sm'
          : 'bg-white text-gray-500 border border-gray-200'
      }`}
    >
      {children}
    </button>
  )
}
