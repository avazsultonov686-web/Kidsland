import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'

export default function SupportPage() {
  const { t } = useTranslation()

  const SUPPORT_ITEMS = [
    {
      icon: '📞',
      label: 'Телефон',
      value: t('supportPhone'),
      href: `tel:${t('supportPhone').replace(/\s/g, '')}`,
      bg: 'bg-pastel-mint',
      textColor: 'text-[#065f46]',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: t('supportEmail'),
      href: `mailto:${t('supportEmail')}`,
      bg: 'bg-pastel-sky',
      textColor: 'text-[#1e40af]',
    },
    {
      icon: '✈️',
      label: t('supportChat'),
      value: '@kidslend_tj',
      href: 'https://t.me/kidslend_tj',
      bg: 'bg-[#e6f3ff]',
      textColor: 'text-[#0369a1]',
    },
  ]

  return (
    <PageShell title={t('support')} subtitle="Мы на связи каждый день с 8:00 до 22:00">
      <div className="flex flex-col gap-3 mb-8">
        {SUPPORT_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('https') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-pastel-stroke active:scale-[0.98] transition-transform"
          >
            <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl ${item.bg}`}>
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-pastel-inkmuted font-medium">{item.label}</p>
              <p className={`text-[15px] font-bold truncate ${item.textColor}`}>{item.value}</p>
            </div>
            <ChevronRight />
          </a>
        ))}
      </div>

      {/* FAQ accordion-style */}
      <h2 className="mb-3 text-[16px] font-semibold text-pastel-ink">Частые вопросы</h2>
      <div className="flex flex-col gap-2">
        {FAQ.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </PageShell>
  )
}

function FAQItem({ q, a }) {
  return (
    <details className="rounded-2xl bg-white border border-pastel-stroke overflow-hidden group">
      <summary className="cursor-pointer px-4 py-3.5 text-[14px] font-semibold text-pastel-ink select-none list-none flex justify-between items-center gap-2">
        <span>{q}</span>
        <span className="flex-shrink-0 text-pastel-inkmuted text-[18px] group-open:rotate-45 transition-transform duration-200">+</span>
      </summary>
      <p className="px-4 pb-4 text-[13px] leading-relaxed text-pastel-inkmuted">
        {a}
      </p>
    </details>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

const FAQ = [
  {
    q: 'Как оформить аренду?',
    a: 'Добавьте товар в корзину, укажите даты аренды и оформите заказ. Мы свяжемся с вами в течение 30 минут для подтверждения.',
  },
  {
    q: 'Можно ли продлить аренду?',
    a: 'Да, напишите нам в Telegram или позвоните за 1 день до окончания срока — продлим без проблем.',
  },
  {
    q: 'Как возвращается депозит?',
    a: 'Депозит возвращается в день сдачи товара. Проверяем состояние при получении и сразу переводим деньги.',
  },
  {
    q: 'Что если товар сломается?',
    a: 'Случайные поломки при нормальной эксплуатации покрываются. Умышленные повреждения — за счёт арендатора.',
  },
]
