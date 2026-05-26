import { useTranslation } from '../../hooks/useTranslation'

const OPTIONS = [
  { value: 'city', labelKey: 'deliveryCity' },
  { value: 'country', labelKey: 'deliveryCountry' },
  { value: 'pickup', labelKey: 'deliveryPickup' },
]

export default function DeliverySelect({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{t('deliveryType')}</label>
      <div className="grid grid-cols-1 gap-2">
        {OPTIONS.map(({ value: v, labelKey }) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`py-3 px-4 rounded-xl text-sm font-semibold text-left border transition-colors ${
              value === v
                ? 'border-brand-red bg-red-50 text-brand-red'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
