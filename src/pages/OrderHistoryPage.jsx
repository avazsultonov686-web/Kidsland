import { useState } from 'react'
import PageShell from '../components/ui/PageShell'
import Loader from '../components/ui/Loader'
import { useAuth } from '../context/AuthContext'
import { useUserOrders } from '../hooks/useOrders'
import { useTranslation, getProductName } from '../hooks/useTranslation'
import { ORDER_STATUS_LABELS } from '../lib/constants'

export default function OrderHistoryPage() {
  const { user } = useAuth()
  const { t, language } = useTranslation()
  const { data: orders = [], isLoading } = useUserOrders(user?.id)
  const [selected, setSelected] = useState(null)

  if (isLoading) return <PageShell title={t('orderHistoryTitle')}><Loader /></PageShell>

  return (
    <PageShell title={t('orderHistoryTitle')}>
      {orders.length === 0 ? (
        <p className="text-center text-gray-400 py-12">{t('orderHistoryEmpty')}</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <button
                onClick={() => setSelected(selected?.id === order.id ? null : order)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm text-left active:scale-[0.99]"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-red">
                      {Number(order.total_price).toLocaleString()} сом
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t(ORDER_STATUS_LABELS[order.status])}
                    </p>
                  </div>
                </div>

                {selected?.id === order.id && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800">{t('orderDetails')}</p>
                    {order.order_items?.map((item) => (
                      <p key={item.id}>
                        {getProductName(item.products, language)} × {item.quantity}
                      </p>
                    ))}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}
