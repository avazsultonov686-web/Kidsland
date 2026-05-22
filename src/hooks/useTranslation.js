import { useApp } from '../context/AppContext'
import translations from '../i18n/translations'

export function useTranslation() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] ?? key
  return { t, language }
}
