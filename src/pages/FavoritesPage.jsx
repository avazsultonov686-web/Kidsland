import { useApp } from '../context/AppContext'
import { useTranslation } from '../hooks/useTranslation'

const MOCK_PRODUCTS = [
  { id: 1, name: 'Коляска Bugaboo Fox 3', price: 120, category: 'Коляски' },
  { id: 2, name: 'Автокресло Maxi-Cosi Pebble 360', price: 80, category: 'Автокресла' },
  { id: 3, name: 'Развивающий коврик Fisher-Price', price: 35, category: 'Игрушки' },
  { id: 4, name: 'Кроватка-трансформер Woodi', price: 150, category: 'Мебель' },
  { id: 5, name: 'Прыгунки Jolly Jumper', price: 45, category: 'Игрушки' },
  { id: 6, name: 'Детский велосипед 3-колёсный', price: 60, category: 'Игрушки' },
]

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useApp()
  const { t } = useTranslation()

  const favoriteProducts = MOCK_PRODUCTS.filter((p) => favorites.includes(p.id))

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <p className="text-sm font-medium">{t('favorites')} пусты</p>
      </div>
    )
  }

  return (
    <div className="px-3 py-4 flex flex-col gap-3">
      {favoriteProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
            <p className="text-brand-red font-bold text-sm">{product.price} {t('perDay')}</p>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <button
              onClick={() => toggleFavorite(product.id)}
              className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#E63329" stroke="#E63329" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
            <button
              onClick={() => addToCart(product)}
              className="text-[10px] font-semibold bg-brand-red text-white px-2.5 py-1 rounded-lg active:scale-95 transition-transform"
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
