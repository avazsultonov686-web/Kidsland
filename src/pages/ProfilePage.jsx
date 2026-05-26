import { Link } from 'react-router-dom'
import PageShell from '../components/ui/PageShell'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../hooks/useTranslation'

export default function ProfilePage() {
  const { user } = useAuth()
  const { toggleLanguage, language } = useApp()
  const { t } = useTranslation()

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Guest'
    : 'Guest'

  return (
    <PageShell title={t('profileTitle')}>
      <div className="bg-white rounded-2xl p-5 shadow-sm text-center mb-4">
        {user?.photoUrl ? (
          <img src={user.photoUrl} alt="" className="w-20 h-20 rounded-full mx-auto object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-3xl">
            👤
          </div>
        )}
        <h2 className="font-bold text-lg text-gray-800 mt-3">{displayName}</h2>
        {user?.username && (
          <p className="text-sm text-gray-400">@{user.username}</p>
        )}
        {user?.phone && (
          <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <ProfileLink to="/orders" icon="📋" label={t('orderHistory')} />
        <ProfileLink to="/favorites" icon="❤️" label={t('favorites')} />

        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm active:scale-[0.99]"
        >
          <span className="text-xl">🌐</span>
          <span className="flex-1 text-left font-medium text-gray-700">{t('language')}</span>
          <span className="text-sm font-bold text-brand-red">{language}</span>
        </button>
      </div>
    </PageShell>
  )
}

function ProfileLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm active:scale-[0.99]"
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 font-medium text-gray-700">{label}</span>
      <span className="text-gray-300">›</span>
    </Link>
  )
}
