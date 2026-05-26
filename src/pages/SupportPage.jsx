import PageShell from '../components/ui/PageShell'
import { useTranslation } from '../hooks/useTranslation'
import { getManagerLink } from '../services/telegram'

export default function SupportPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('supportTitle')}>
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <ContactRow icon="📞" label={t('supportPhone')} value="+992 555 123 456" href="tel:+992555123456" />
        <ContactRow icon="✉️" label={t('supportEmail')} value="hello@kidslend.tj" href="mailto:hello@kidslend.tj" />
        <a
          href={getManagerLink()}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-3.5 rounded-2xl bg-brand-blue text-white text-center font-semibold active:scale-95"
        >
          {t('supportChat')}
        </a>
      </div>
    </PageShell>
  )
}

function ContactRow({ icon, label, value, href }) {
  return (
    <a href={href} className="flex items-center gap-3 active:opacity-70">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </a>
  )
}
