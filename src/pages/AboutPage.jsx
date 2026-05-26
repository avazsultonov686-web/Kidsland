import PageShell from '../components/ui/PageShell'
import KidsLendLogo from '../components/ui/KidsLendLogo'
import { useTranslation } from '../hooks/useTranslation'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('aboutTitle')}>
      <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
        <KidsLendLogo className="h-20 w-auto mx-auto object-contain mb-4" />
        <p className="text-sm text-gray-600 leading-relaxed">{t('aboutText')}</p>
      </div>
    </PageShell>
  )
}
