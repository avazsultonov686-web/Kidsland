import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'
import { useState } from 'react'

const PRODUCTS_BY_AGE = {
  '0-1': [
    { id: 11, name: 'Шезлонг для новорождённых',   price: 40,  category: 'furniture' },
    { id: 12, name: 'Мобиль музыкальный',           price: 25,  category: 'development' },
    { id: 13, name: 'Автокресло 0+ группы',         price: 80,  category: 'carSeats' },
    { id: 14, name: 'Люлька-переноска',             price: 35,  category: 'furniture' },
  ],
  '1-3': [
    { id: 3,  name: 'Развивающий коврик Fisher-Price', price: 35, category: 'toys' },
    { id: 5,  name: 'Прыгунки Jolly Jumper',           price: 45, category: 'toys' },
    { id: 15, name: 'Сортер деревянный',               price: 18, category: 'development' },
    { id: 16, name: 'Ходунки 4 колёса',                price: 30, category: 'furniture' },
  ],
  '3-6': [
    { id: 6,  name: 'Велосипед 3-колёсный',        price: 60, category: 'toys' },
    { id: 17, name: 'Самокат детский',              price: 55, category: 'toys' },
    { id: 18, name: 'Горка пластиковая',            price: 70, category: 'furniture' },
    { id: 9,  name: 'Пирамидка деревянная',        price: 20, category: 'development' },
  ],
}

const AGE_GROUPS = [
  { key: '0-1', labelKey: 'age_0_1', color: '#FCE8EF', text: '#be185d' },
  { key: '1-3', labelKey: 'age_1_3', color: '#FFECD8', text: '#c2410c' },
  { key: '3-6', labelKey: 'age_3_6', color: '#E4F7EF', text: '#065f46' },
]

export default function AgePage() {
  const { t } = useTranslation()
  const [activeAge, setActiveAge] = useState('0-1')
  const products = PRODUCTS_BY_AGE[activeAge] ?? []

  return (
    <PageShell title={t('age')}>
      {/* Age group selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {AGE_GROUPS.map((g) => {
          const isActive = activeAge === g.key
          return (
            <button
              key={g.key}
              onClick={() => setActiveAge(g.key)}
              style={isActive ? { backgroundColor: g.color, color: g.text, borderColor: g.color } : {}}
              className={`rounded-2xl py-3.5 text-center text-[13px] font-bold leading-tight transition-all active:scale-95 ${
                isActive
                  ? 'shadow-sm ring-2 ring-inset ring-current/20'
                  : 'border border-pastel-stroke bg-white text-pastel-inkmuted'
              }`}
            >
              {t(g.labelKey)}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  )
}
