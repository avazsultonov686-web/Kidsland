import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useNavigation } from '../context/NavigationContext'
import { useTranslation } from '../hooks/useTranslation'

const PLACEHOLDER_DESCRIPTION =
  'Качественный товар для детей. Идеально подходит для игры, развития и радости вашего малыша. Все изделия проходят проверку перед выдачей.'

export default function ProductPage() {
  const { product, navigate } = useNavigation()
  const { addToCart } = useApp()
  const { t } = useTranslation()
  const [imgError, setImgError] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-12">
        <p className="text-sm text-gray-500">Товар не найден</p>
        <button
          onClick={() => navigate('home')}
          className="rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white active:scale-95 transition-transform"
        >
          {t('back')}
        </button>
      </div>
    )
  }

  const description = product.description || PLACEHOLDER_DESCRIPTION

  return (
    <div className="min-h-full bg-white pb-24">
      {/* Back button */}
      <div className="sticky top-0 z-10 flex items-center px-4 py-3 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-700 active:scale-95 transition-transform"
          aria-label={t('back')}
        >
          <BackIcon />
          {t('back')}
        </button>
      </div>

      {/* Photo */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-300">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="mt-2 text-sm">Фото</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pt-5 pb-4">
        {product.category && (
          <span className="inline-block rounded-full bg-brand-orange/15 px-3 py-1 text-[12px] font-semibold text-brand-orange mb-3">
            {product.category}
          </span>
        )}

        <h1 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-gray-900 mb-3">
          {product.name}
        </h1>

        <p className="text-[28px] font-black text-brand-red mb-5">
          {product.price.toLocaleString()}{' '}
          <span className="text-[15px] font-semibold text-gray-400">сом</span>
        </p>

        <h2 className="text-[14px] font-semibold text-gray-800 mb-2">{t('description')}</h2>
        <p className="text-[14px] leading-relaxed text-gray-600">{description}</p>
      </div>

      {/* Fixed buy button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white px-4 py-3 pb-safe">
        <button
          onClick={() => addToCart(product)}
          className="w-full rounded-2xl bg-brand-red py-3.5 text-[16px] font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
        >
          🛍️ {t('buy')}
        </button>
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
