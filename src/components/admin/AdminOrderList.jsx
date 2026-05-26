import { useTranslation } from '../../hooks/useTranslation'
import { ORDER_STATUS_LABELS } from '../../lib/constants'

export default function AdminOrderList({ orders, onStatusChange, onSelect }) {
  const { t } = useTranslation()

  if (!orders?.length) {
    return <p className="text-center text-gray-400 py-8">{t('empty')}</p>
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <li
          key={order.id}
          className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer active:scale-[0.99]"
          onClick={() => onSelect?.(order)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">#{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">{order.user_name}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <p className="font-bold text-brand-red">
              {Number(order.total_price).toLocaleString()} сом
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <select
              value={order.status}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
            >
              {Object.entries(ORDER_STATUS_LABELS).map(([key, labelKey]) => (
                <option key={key} value={key}>{t(labelKey)}</option>
              ))}
            </select>
          </div>
        </li>
      ))}
    </ul>
  )
}
