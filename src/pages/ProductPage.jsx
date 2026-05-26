import { useNavigate, useParams } from 'react-router-dom'
import ProductImageSlider from '../components/product/ProductImageSlider'
import Loader from '../components/ui/Loader'
import { useApp } from '../context/AppContext'
import { useProduct } from '../hooks/useProducts'
import { useTranslation, getProductName, getProductDescription } from '../hooks/useTranslation'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleFavorite, favorites } = useApp()
  const { t, language } = useTranslation()
  const { data: product, isLoading } = useProduct(id)

  if (isLoading) return <Loader className="min-h-screen" />
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">{t('empty')}</p>
      </div>
    )
  }

  const name = getProductName(product, language)
  const description = getProductDescription(product, language)
  const isFavorite = favorites.includes(product.id)
  const chars = product.characteristics || {}

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90"
        >
          ←
        </button>
        <h1 className="text-base font-semibold line-clamp-1 flex-1">{name}</h1>
      </div>

      <ProductImageSlider images={product.images} />

      <div className="px-4 py-4 space-y-4">
        <div>
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-2">{name}</h2>
          <p className="text-2xl font-bold text-brand-red mt-1">
            {Number(product.price).toLocaleString()} сом
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {t('ageFilter')}: {product.age_min}–{product.age_max} {t('ageYears')}
          </p>
        </div>

        {Object.keys(chars).length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">{t('characteristics')}</h3>
            <dl className="space-y-1 text-sm">
              {Object.entries(chars).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-medium text-gray-800">{String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {description && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">{t('description')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2">
        <button
          onClick={() => toggleFavorite(product.id)}
          className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={isFavorite ? '#E8312A' : 'none'}
            stroke={isFavorite ? '#E8312A' : '#9ca3af'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 py-3 rounded-2xl bg-brand-red text-white font-semibold active:scale-95"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  )
}
