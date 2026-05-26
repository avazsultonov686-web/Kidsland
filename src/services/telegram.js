const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const ADMIN_CHAT_ID = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID

const DELIVERY_LABELS = {
  city: 'По Душанбе',
  country: 'По Таджикистану',
  pickup: 'Самовывоз',
}

const PAYMENT_LABELS = {
  card: 'Карта',
  cash: 'Наличные',
}

function formatItems(items) {
  if (!items?.length) return '—'
  return items
    .map((item) => {
      const name = item.products?.name_ru || item.name || 'Товар'
      return `${name} × ${item.quantity}`
    })
    .join('\n')
}

export async function sendOrderNotification(order, items) {
  if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
    console.warn('Telegram bot not configured')
    return
  }

  const shortId = order.id?.slice(0, 8) || '—'
  const text = [
    `🛍 Новый заказ #${shortId}`,
    `👤 ${order.user_name}`,
    `📱 ${order.user_phone}`,
    `📦 ${formatItems(order.order_items || items)}`,
    `💰 Сумма: ${Number(order.total_price).toLocaleString()} сом`,
    `🚚 Доставка: ${DELIVERY_LABELS[order.delivery_type] || order.delivery_type}`,
    `💳 Оплата: ${PAYMENT_LABELS[order.payment_method] || order.payment_method}`,
    `📍 Адрес: ${order.delivery_address || '—'}`,
    `💬 Комментарий: ${order.comment || '—'}`,
  ].join('\n')

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.description || 'Telegram API error')
  }
}

export function getManagerLink() {
  const username = import.meta.env.VITE_TELEGRAM_MANAGER_USERNAME || 'kidslend_manager'
  return `https://t.me/${username}`
}
