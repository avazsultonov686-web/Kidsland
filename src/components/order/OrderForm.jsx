import DeliverySelect from './DeliverySelect'
import { useTranslation, getProductName } from '../../hooks/useTranslation'

export default function OrderForm({
  form,
  onChange,
  cartItems,
  total,
  onSubmit,
  loading,
  language,
}) {
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label={t('firstName')} value={form.firstName} onChange={(v) => onChange('firstName', v)} required />
        <Field label={t('lastName')} value={form.lastName} onChange={(v) => onChange('lastName', v)} required />
      </div>

      <Field label={t('phone')} value={form.phone} onChange={(v) => onChange('phone', v)} type="tel" required />

      <DeliverySelect value={form.deliveryType} onChange={(v) => onChange('deliveryType', v)} />

      {form.deliveryType !== 'pickup' && (
        <Field label={t('address')} value={form.address} onChange={(v) => onChange('address', v)} required />
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">{t('paymentMethod')}</label>
        <div className="grid grid-cols-2 gap-2">
          {['card', 'cash'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onChange('paymentMethod', method)}
              className={`py-3 rounded-xl text-sm font-semibold border ${
                form.paymentMethod === method
                  ? 'border-brand-red bg-red-50 text-brand-red'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              {t(method === 'card' ? 'paymentCard' : 'paymentCash')}
            </button>
          ))}
        </div>
      </div>

      <Field
        label={t('comment')}
        value={form.comment}
        onChange={(v) => onChange('comment', v)}
        multiline
      />

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">{t('orderItems')}</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{getProductName(item, language)} × {item.qty}</span>
              <span>{(item.price * item.qty).toLocaleString()} сом</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-3 pt-3 border-t font-bold text-brand-red">
          <span>{t('total')}</span>
          <span>{total.toLocaleString()} сом</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-2xl bg-brand-red text-white font-semibold active:scale-95 disabled:opacity-50"
      >
        {loading ? t('loading') : t('confirmOrder')}
      </button>
    </form>
  )
}

function Field({ label, value, onChange, type = 'text', required, multiline }) {
  const cls = 'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300'

  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-1 block">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={cls}
        />
      )}
    </div>
  )
}
