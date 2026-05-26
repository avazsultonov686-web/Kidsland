import { useTranslation, getProductName } from '../../hooks/useTranslation'

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const { t, language } = useTranslation()
  const name = getProductName(item, language)

  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm">
      <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🧸</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-brand-red font-bold mt-1">
          {Number(item.price).toLocaleString()} сом
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQty(item.id, item.qty - 1)}
              className="w-8 h-8 rounded-lg bg-gray-100 font-bold active:scale-90"
            >
              −
            </button>
            <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
              className="w-8 h-8 rounded-lg bg-gray-100 font-bold active:scale-90"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-gray-400 hover:text-brand-red"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </div>
  )
}
