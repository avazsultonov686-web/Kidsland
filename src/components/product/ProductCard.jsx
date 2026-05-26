import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useTranslation, getProductName } from '../../hooks/useTranslation'

export default function ProductCard({ product }) {
  const { addToCart, toggleFavorite, favorites } = useApp()
  const { t, language } = useTranslation()
  const [imgError, setImgError] = useState(false)

  const isFavorite = favorites.includes(product.id)
  const name = getProductName(product, language)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1 active:scale-[0.98] transition-transform">
        <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
          {product.image && !imgError ? (
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
              <span className="text-3xl">🧸</span>
            </div>
          )}

          {product.category && (
            <span className="absolute top-2 left-2 bg-brand-orange/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          )}
        </div>

        <div className="flex flex-col p-3 flex-1">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 flex-1 mb-2">
            {name}
          </h3>
          <span className="text-lg font-bold text-brand-red mb-3">
            {Number(product.price).toLocaleString()} сом
          </span>
        </div>
      </Link>

      <div className="px-3 pb-3 flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 py-2 rounded-xl text-sm font-semibold bg-brand-red text-white active:scale-95 transition-transform"
        >
          {t('buy')}
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center active:scale-90"
          aria-label="favorite"
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={isFavorite ? '#E8312A' : 'none'}
            stroke={isFavorite ? '#E8312A' : '#9ca3af'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
