import { Link } from 'react-router-dom'
import PageShell from '../../components/ui/PageShell'
import Loader from '../../components/ui/Loader'
import { useAdminStats } from '../../hooks/useOrders'
import { useTranslation } from '../../hooks/useTranslation'

export default function AdminPage() {
  const { t } = useTranslation()
  const { data: stats, isLoading } = useAdminStats()

  return (
    <PageShell title={t('adminTitle')}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard label={t('adminStatsToday')} value={stats?.todayCount ?? 0} />
            <StatCard
              label={t('adminStatsRevenue')}
              value={`${(stats?.todayRevenue ?? 0).toLocaleString()} с`}
            />
            <StatCard label={t('adminStatsNew')} value={stats?.newCount ?? 0} />
          </div>

          <div className="space-y-3">
            <AdminLink to="/admin/products" icon="📦" label={t('adminProducts')} />
            <AdminLink to="/admin/orders" icon="📋" label={t('adminOrders')} />
          </div>
        </>
      )}
    </PageShell>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
      <p className="text-lg font-bold text-brand-red">{value}</p>
      <p className="text-[10px] text-gray-500 mt-1 leading-tight">{label}</p>
    </div>
  )
}

function AdminLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm active:scale-[0.99]"
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 font-medium text-gray-700">{label}</span>
      <span className="text-gray-300">›</span>
    </Link>
  )
}
