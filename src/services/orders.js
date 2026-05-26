import { supabase } from '../lib/supabase'
import { sendOrderNotification } from './telegram'

export async function createOrder({ order, items }) {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (orderError) throw orderError

  const orderItems = items.map((item) => ({
    order_id: orderData.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw itemsError

  const { data: fullOrder } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id, quantity, price,
        products ( id, name_ru, name_tj )
      )
    `)
    .eq('id', orderData.id)
    .single()

  try {
    await sendOrderNotification(fullOrder || orderData, items)
  } catch (e) {
    console.warn('Telegram notification failed:', e)
  }

  return fullOrder || orderData
}

export async function fetchUserOrders(telegramId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id, quantity, price,
        products ( id, name_ru, name_tj, product_images ( url, is_main ) )
      )
    `)
    .eq('user_telegram_id', telegramId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function fetchAllOrders(status) {
  let query = supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id, quantity, price,
        products ( id, name_ru, name_tj )
      )
    `)
    .order('created_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function fetchOrderById(id) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id, quantity, price,
        products ( id, name_ru, name_tj, product_images ( url, is_main ) )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchAdminStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from('orders')
    .select('id, total_price, status, created_at')
    .gte('created_at', today.toISOString())

  if (error) throw error

  const orders = data || []
  return {
    todayCount: orders.length,
    todayRevenue: orders.reduce((s, o) => s + Number(o.total_price), 0),
    newCount: orders.filter((o) => o.status === 'new').length,
  }
}
