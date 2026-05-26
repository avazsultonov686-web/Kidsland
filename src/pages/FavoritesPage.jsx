import { useEffect, useState } from 'react'
import ProductCard from '../components/product/ProductCard'
import PageShell from '../components/ui/PageShell'
import Loader from '../components/ui/Loader'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../hooks/useTranslation'
import { fetchFavoriteProducts } from '../services/users'

export default function FavoritesPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }
    fetchFavoriteProducts(user.id)
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [user?.id])

  return (
    <PageShell title={t('favorites')}>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 py-12">{t('favoritesEmpty')}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  )
}
