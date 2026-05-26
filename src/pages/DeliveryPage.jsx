import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

export default function DeliveryPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('deliveryTitle')}>
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-sm text-gray-600 leading-relaxed">{t('deliveryInfo')}</p>
        <ul className="mt-4 space-y-3 text-sm text-gray-700">
          <li className="flex gap-2"><span>🚚</span> {t('deliveryCity')}</li>
          <li className="flex gap-2"><span>📦</span> {t('deliveryCountry')}</li>
          <li className="flex gap-2"><span>🏪</span> {t('deliveryPickup')}</li>
          <li className="flex gap-2"><span>💳</span> {t('paymentCard')} / {t('paymentCash')}</li>
        </ul>
      </div>
    </PageShell>
  )
}
