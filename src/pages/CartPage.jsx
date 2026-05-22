import { useApp } from '../context/AppContext'
import { useTranslation } from '../hooks/useTranslation'

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart } = useApp()
  const { t } = useTranslation()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <p className="text-sm font-medium">{t('cart')} пуста</p>
      </div>
    )
  }

  return (
    <div className="px-3 py-4 flex flex-col gap-3">
      {cartItems.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
            <p className="text-brand-red font-bold text-sm">{item.price} {t('perDay')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeFromCart(item.id)}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg active:scale-90 transition-transform"
            >
              −
            </button>
            <span className="w-5 text-center font-semibold text-sm">{item.qty}</span>
            <button
              onClick={() => addToCart(item)}
              className="w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-lg active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-2">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-700">Итого / рӯз:</span>
          <span className="text-xl font-bold text-brand-red">{total.toLocaleString()} {t('perDay')}</span>
        </div>
        <button className="btn-primary w-full py-3 text-base rounded-xl">
          Оформить аренду
        </button>
      </div>
    </div>
  )
}
