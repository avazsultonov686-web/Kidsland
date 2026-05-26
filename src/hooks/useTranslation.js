import { useApp } from '../context/AppContext'
import ru from '../i18n/ru'
import tj from '../i18n/tj'

const translations = { RU: ru, TJ: tj }

export function useTranslation() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] ?? key
  return { t, language }
}

export function getProductName(product, language) {
  if (!product) return ''
  return language === 'TJ' ? product.name_tj : product.name_ru
}

export function getProductDescription(product, language) {
  if (!product) return ''
  return language === 'TJ' ? product.description_tj : product.description_ru
}
