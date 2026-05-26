import { Link, useLocation } from 'react-router-dom'
import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'
import { getManagerLink } from '../services/telegram'

export default function OrderSuccessPage() {
  const { t } = useTranslation()
  const { state } = useLocation()
  const order = state?.order

  return (
    <PageShell title={t('orderSuccessTitle')} subtitle={t('orderSuccessSubtitle')}>
      <div className="text-center py-8">
        <p className="text-5xl mb-4">✅</p>
        {order && (
          <p className="text-sm text-gray-500 mb-6">
            {t('orderNumber')}: <span className="font-bold text-gray-800">#{order.id?.slice(0, 8)}</span>
          </p>
        )}

        <div className="space-y-3">
          <a
            href={getManagerLink()}
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3.5 rounded-2xl bg-brand-blue text-white font-semibold active:scale-95"
          >
            {t('writeManager')}
          </a>
          <Link
            to="/"
            className="block w-full py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold active:scale-95"
          >
            {t('goHome')}
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
