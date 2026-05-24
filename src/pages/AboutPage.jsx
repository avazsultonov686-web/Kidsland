import PageShell from '../components/ui/PageShell'
import KidsLendLogo from '../components/ui/KidsLendLogo'
import { useTranslation } from '../hooks/useTranslation'

const STATS = [
  { value: '500+', label: 'товаров' },
  { value: '1 200+', label: 'аренд' },
  { value: '4.9 ★', label: 'рейтинг' },
  { value: '2022', label: 'с нас года' },
]

const VALUES = [
  { icon: '🛡️', title: 'Безопасность', text: 'Все товары проходят санитарную обработку и проверку перед каждой арендой.' },
  { icon: '✅', title: 'Качество', text: 'Только проверенные бренды: Bugaboo, Stokke, Maxi-Cosi, Fisher-Price и другие.' },
  { icon: '💚', title: 'Экология', text: 'Аренда — это экологично. Меньше производства, больше повторного использования.' },
  { icon: '🤝', title: 'Доверие', text: 'Более 600 семей доверяют нам. Работаем честно, без скрытых платежей.' },
]

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageShell>
      {/* Logo hero */}
      <div className="flex flex-col items-center py-6 mb-6">
        <KidsLendLogo className="h-20 w-auto object-contain mb-4" />
        <p className="text-center text-[14px] text-pastel-inkmuted leading-relaxed max-w-xs">
          {t('aboutText')}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white border border-pastel-stroke p-4 text-center shadow-sm"
          >
            <p className="text-[22px] font-black text-pastel-ink">{s.value}</p>
            <p className="text-[12px] text-pastel-inkmuted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="mb-3 text-[16px] font-semibold text-pastel-ink">Наши ценности</h2>
      <div className="flex flex-col gap-3">
        {VALUES.map((v) => (
          <div key={v.title} className="flex items-start gap-4 rounded-2xl bg-white p-4 border border-pastel-stroke shadow-sm">
            <span className="text-2xl mt-0.5">{v.icon}</span>
            <div>
              <p className="font-semibold text-[14px] text-pastel-ink">{v.title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-pastel-inkmuted">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="mt-7 flex flex-col gap-2">
        {[
          { icon: '✈️', label: 'Telegram', href: 'https://t.me/kidslend_tj' },
          { icon: '📸', label: 'Instagram', href: 'https://instagram.com/kidslend.tj' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white border border-pastel-stroke p-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-[14px] font-semibold text-pastel-ink">{s.label}</span>
            <ChevronRight className="ml-auto" />
          </a>
        ))}
      </div>
    </PageShell>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
