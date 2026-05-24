import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

const DELIVERY_SECTIONS = [
  {
    icon: '🚚',
    titleKey: 'Зона доставки',
    textKey: 'Доставляем по всему Душанбе и Хатлонской, Согдийской областям. Стоимость доставки — 20 сом.',
  },
  {
    icon: '⏱️',
    titleKey: 'Сроки',
    textKey: 'Доставка в день заказа или на следующий день. Выберите удобный временной слот при оформлении.',
  },
  {
    icon: '💳',
    titleKey: 'Оплата',
    textKey: 'Принимаем наличные, банковские карты Visa/Mastercard, переводы через Telegram и Alif Pay.',
  },
  {
    icon: '🔄',
    titleKey: 'Возврат',
    textKey: 'Забираем товар после аренды самостоятельно — вам ничего не нужно везти.',
  },
  {
    icon: '🛡️',
    titleKey: 'Страховой депозит',
    textKey: 'Депозит 10–15% от стоимости товара. Возвращается в полном объёме при отсутствии повреждений.',
  },
]

export default function DeliveryPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('delivery')}>
      <div className="flex flex-col gap-4">
        {DELIVERY_SECTIONS.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm border border-pastel-stroke"
          >
            <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-pastel-sky text-xl">
              {s.icon}
            </span>
            <div>
              <p className="font-semibold text-pastel-ink text-[14px]">{s.titleKey}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-pastel-inkmuted">{s.textKey}</p>
            </div>
          </div>
        ))}

        {/* Price table */}
        <div className="mt-2 rounded-2xl bg-white border border-pastel-stroke overflow-hidden shadow-sm">
          <div className="bg-pastel-mint px-4 py-3">
            <p className="text-[13px] font-bold text-[#065f46]">Стоимость доставки</p>
          </div>
          {[
            { zone: 'Душанбе (центр)', price: 'Бесплатно от 200 сом' },
            { zone: 'Душанбе (районы)', price: '20 сом' },
            { zone: 'Регионы', price: '50–80 сом' },
          ].map((row) => (
            <div
              key={row.zone}
              className="flex items-center justify-between px-4 py-3 border-t border-pastel-stroke"
            >
              <span className="text-[13px] text-pastel-ink">{row.zone}</span>
              <span className="text-[13px] font-semibold text-pastel-ink">{row.price}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
