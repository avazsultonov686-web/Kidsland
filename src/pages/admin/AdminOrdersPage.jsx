import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminOrderList from '../../components/admin/AdminOrderList'
import PageShell from '../../components/ui/PageShell'
import Loader from '../../components/ui/Loader'
import { useAllOrders, useUpdateOrderStatus } from '../../hooks/useOrders'
import { useTranslation } from '../../hooks/useTranslation'
import { ORDER_STATUS_LABELS } from '../../lib/constants'

export default function AdminOrdersPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('all')
  const { data: orders = [], isLoading } = useAllOrders(status)
  const updateStatus = useUpdateOrderStatus()

  return (
    <PageShell title={t('adminOrders')}>
      <Link to="/admin" className="text-sm text-brand-red mb-4 inline-block">← {t('admin')}</Link>

      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-500">{t('filterStatus')}</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
        >
          <option value="all">{t('allCategories')}</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, labelKey]) => (
            <option key={key} value={key}>{t(labelKey)}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <AdminOrderList
          orders={orders}
          onStatusChange={(id, newStatus) =>
            updateStatus.mutate({ id, status: newStatus })
          }
        />
      )}
    </PageShell>
  )
}
