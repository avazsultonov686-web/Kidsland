import { useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import CategorySection from '../components/category/CategorySection'
import { useTranslation } from '../hooks/useTranslation'

const MOCK_PRODUCTS = [
  { id: 1, name: 'Коляска Bugaboo Fox 3', price: 120, category: 'Коляски',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&q=80' },
  { id: 2, name: 'Автокресло Maxi-Cosi Pebble 360', price: 80, category: 'Автокресла',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80' },
  { id: 3, name: 'Развивающий коврик Fisher-Price', price: 35, category: 'Игрушки',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80' },
  { id: 4, name: 'Кроватка-трансформер Woodi', price: 150, category: 'Мебель',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80' },
  { id: 5, name: 'Прыгунки Jolly Jumper', price: 45, category: 'Игрушки',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80' },
  { id: 6, name: 'Детский велосипед 3-колёсный', price: 60, category: 'Игрушки',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
]

const BANNER_SLIDES = [
  { id: 1, bg: '#FFF8EE' },
  { id: 2, bg: '#EEF6FF' },
  { id: 3, bg: '#F0FFF4' },
]

const PERKS = [
  { icon: '🔄', label: 'Гарантия возврата в течение 72ч' },
  { icon: '🚚', label: 'Доставка по городу' },
  { icon: '✅', label: 'Гарантия качества' },
  { icon: '😊', label: 'Поддержка 24/7' },
]

export default function HomePage() {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0)

  return (
    <div className="min-h-full bg-[#faf9fc] pb-6 pt-16">

      {/* Search */}
      <div className="px-4 pt-4 mb-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder={t('search')}
            className="min-h-[48px] w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-[15px] text-gray-700 placeholder:text-gray-400 shadow-sm outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-5">
        <div
          className="relative rounded-3xl overflow-hidden p-5 min-h-[120px] flex items-center"
          style={{ backgroundColor: BANNER_SLIDES[slide].bg }}
        >
          <div className="flex-1 z-10">
            <h2 className="text-[20px] font-bold text-gray-800 leading-tight mb-1">
              Лучшие игрушки<br />для развития<br />и радости
            </h2>
            <p className="text-[12px] text-gray-500 mb-3">
              Купите любимые игрушки<br />по доступной цене
            </p>
            <button className="bg-[#E8312A] text-white text-[13px] font-semibold px-4 py-2 rounded-xl active:scale-95 transition-transform">
              Смотреть игрушки
            </button>
          </div>

          {/* Right side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&q=80"
              alt="baby"
              className="w-28 h-28 object-cover rounded-2xl"
            />
            <div className="bg-blue-500 text-white text-[11px] font-bold rounded-full w-14 h-14 flex items-center justify-center text-center leading-tight">
              Более<br />500+<br />игрушек
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-5 flex gap-1.5">
            {BANNER_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-[#E8312A] w-4' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategorySection className="mb-5" />

      {/* Popular */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-[17px] font-bold text-gray-800">
            Популярно сегодня 🔥
          </h3>
          <button className="text-[13px] text-blue-500 font-medium">
            Смотреть все
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[160px] bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[120px] object-cover"
                  onError={(e) => { e.target.style.display='none' }}
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  0-3 лет
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-gray-400 text-sm">♡</span>
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] text-gray-700 font-medium leading-tight mb-1 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[15px] font-bold text-[#E8312A] mb-2">
                  {product.price} <span className="text-[11px] font-normal text-gray-400">сом/день</span>
                </p>
                <button className="w-full bg-[#E8312A] text-white text-[12px] font-semibold py-1.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-1">
                  🛍️ Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-2">
          {PERKS.map((perk) => (
            <div key={perk.label} className="bg-white rounded-2xl p-2 flex flex-col items-center text-center shadow-sm">
              <span className="text-2xl mb-1">{perk.icon}</span>
              <p className="text-[10px] text-gray-500 leading-tight">{perk.label}</p>
            </div>
          ))}
        </div>
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