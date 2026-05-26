import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderForm from '../components/order/OrderForm'
import PageShell from '../components/ui/PageShell'
import Loader from '../components/ui/Loader'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useCreateOrder } from '../hooks/useOrders'
import { useTranslation } from '../hooks/useTranslation'
import { upsertUser } from '../services/users'

export default function OrderPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, cartTotal, clearCart, language } = useApp()
  const { t } = useTranslation()
  const createOrder = useCreateOrder()

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    deliveryType: 'city',
    address: '',
    paymentMethod: 'cash',
    comment: '',
  })

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart', { replace: true })
    }
  }, [cartItems.length, navigate])

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        firstName: f.firstName || user.firstName || '',
        lastName: f.lastName || user.lastName || '',
        phone: f.phone || user.phone || '',
      }))
    }
  }, [user])

  const onChange = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cartItems.length) return

    const order = {
      user_telegram_id: user?.id || 0,
      user_name: `${form.firstName} ${form.lastName}`.trim(),
      user_phone: form.phone,
      delivery_type: form.deliveryType,
      delivery_address: form.deliveryType === 'pickup' ? null : form.address,
      payment_method: form.paymentMethod,
      status: 'new',
      total_price: cartTotal,
      comment: form.comment || null,
    }

    const items = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.qty,
      price: item.price,
    }))

    try {
      if (user?.id) {
        await upsertUser({
          telegram_id: user.id,
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
        })
      }

      const result = await createOrder.mutateAsync({ order, items })
      clearCart()
      navigate('/order/success', { state: { order: result } })
    } catch (err) {
      console.error(err)
      alert('Ошибка при оформлении заказа')
    }
  }

  if (cartItems.length === 0) return <Loader className="min-h-screen" />

  return (
    <PageShell title={t('orderTitle')}>
      <OrderForm
        form={form}
        onChange={onChange}
        cartItems={cartItems}
        total={cartTotal}
        onSubmit={handleSubmit}
        loading={createOrder.isPending}
        language={language}
      />
    </PageShell>
  )
}
