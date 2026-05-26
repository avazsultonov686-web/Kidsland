import { Link } from 'react-router-dom'
import CartItem from '../components/order/CartItem'
import PageShell from '../components/ui/PageShell'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../hooks/useTranslation'

export default function CartPage() {
  const { cartItems, cartTotal, updateCartQty, removeFromCart } = useApp()
  const { t } = useTranslation()

  return (
    <PageShell title={t('cartTitle')}>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🛒</p>
          <p className="text-gray-400">{t('cartEmpty')}</p>
          <Link to="/catalog" className="inline-block mt-4 text-brand-red font-semibold">
            {t('catalog')}
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm sticky bottom-20">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700">{t('total')}</span>
              <span className="text-xl font-bold text-brand-red">
                {cartTotal.toLocaleString()} сом
              </span>
            </div>
            <Link
              to="/order"
              className="block w-full py-3.5 rounded-2xl bg-brand-red text-white text-center font-semibold active:scale-95"
            >
              {t('checkout')}
            </Link>
          </div>
        </>
      )}
    </PageShell>
  )
}
