import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AdminProductForm from '../../components/admin/AdminProductForm'
import PageShell from '../../components/ui/PageShell'
import Loader from '../../components/ui/Loader'
import { useProductMutations } from '../../hooks/useProducts'
import { useTranslation, getProductName } from '../../hooks/useTranslation'
import { fetchAllProductsAdmin } from '../../services/products'

export default function AdminProductsPage() {
  const { t, language } = useTranslation()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products-admin'],
    queryFn: fetchAllProductsAdmin,
  })

  const { create, update, remove, toggleActive, uploadImages } = useProductMutations()

  const handleSave = async (data) => {
    const { files, ...productData } = data
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: productData })
      } else {
        const created = await create.mutateAsync(productData)
        if (files?.length) {
          await uploadImages.mutateAsync({ productId: created.id, files })
        }
      }
      setShowForm(false)
      setEditing(null)
      refetch()
    } catch (e) {
      console.error(e)
      alert('Ошибка сохранения')
    }
  }

  return (
    <PageShell title={t('adminProducts')}>
      <div className="flex items-center justify-between mb-4">
        <Link to="/admin" className="text-sm text-brand-red">← {t('admin')}</Link>
        <button
          onClick={() => { setShowForm(true); setEditing(null) }}
          className="px-4 py-2 rounded-xl bg-brand-red text-white text-sm font-semibold"
        >
          + {t('addProduct')}
        </button>
      </div>

      {(showForm || editing) && (
        <div className="mb-4">
          <AdminProductForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null) }}
            saving={create.isPending || update.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                  {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-1">{getProductName(p, language)}</p>
                  <p className="text-brand-red font-bold text-sm">{Number(p.price).toLocaleString()} сом</p>
                  <p className="text-xs text-gray-400">{p.is_active ? t('active') : t('inactive')}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setEditing(p); setShowForm(false) }}
                  className="flex-1 py-2 rounded-xl bg-gray-100 text-sm font-semibold"
                >
                  {t('editProduct')}
                </button>
                <button
                  onClick={() => toggleActive.mutate({ id: p.id, is_active: !p.is_active })}
                  className="px-3 py-2 rounded-xl border text-sm"
                >
                  {p.is_active ? '👁' : '🚫'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Удалить?')) remove.mutate(p.id)
                  }}
                  className="px-3 py-2 rounded-xl border border-red-200 text-brand-red text-sm"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  )
}
