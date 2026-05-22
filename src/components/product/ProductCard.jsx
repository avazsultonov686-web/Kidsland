import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useTranslation } from '../../hooks/useTranslation'

export default function ProductCard({ product }) {
  const { addToCart, toggleFavorite, favorites, cartItems } = useApp()
  const { t } = useTranslation()
  const [imgError, setImgError] = useState(false)

  const isFavorite = favorites.includes(product.id)
  const inCart = cartItems.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {/* Product image */}
      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
            <ImagePlaceholderIcon />
            <span className="text-xs text-gray-300">Фото</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#E63329' : 'none'}
            stroke={isFavorite ? '#E63329' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Category badge */}
        {product.category && (
          <span className="absolute top-2 left-2 bg-brand-orange/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {product.category}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-1 mt-auto">
          <span className="text-lg font-bold text-brand-red">
            {product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">{t('perDay')}</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className={`
            w-full py-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95
            ${inCart
              ? 'bg-brand-green text-white'
              : 'bg-brand-red text-white hover:bg-red-600'
            }
          `}
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-1.5">
              <CheckIcon />
              {t('inCart')}
            </span>
          ) : (
            t('addToCart')
          )}
        </button>
      </div>
    </div>
  )
}

function ImagePlaceholderIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
