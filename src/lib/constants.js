export const CATEGORIES = [
  { id: 'Конструкторы', labelKey: 'catConstructors', emoji: '🧱', bg: '#FFE8D6' },
  { id: 'Мягкие игрушки', labelKey: 'catSoftToys', emoji: '🧸', bg: '#FFF0D6' },
  { id: 'Радиоуправляемые', labelKey: 'catRemote', emoji: '🎮', bg: '#E8F5E8' },
  { id: 'Машинки', labelKey: 'catCars', emoji: '🚗', bg: '#E8F0FF' },
  { id: 'Коляски и самокаты', labelKey: 'catStrollers', emoji: '🛴', bg: '#F0E8FF' },
  { id: 'Мебель детская', labelKey: 'catFurniture', emoji: '🛏', bg: '#E8FFF0' },
  { id: 'Куклы', labelKey: 'catDolls', emoji: '🪆', bg: '#FFE8F5' },
  { id: 'Наборы принцесс', labelKey: 'catPrincess', emoji: '👑', bg: '#FFF8E8' },
]

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id)

export const ORDER_STATUS_LABELS = {
  new: 'statusNew',
  processing: 'statusProcessing',
  delivering: 'statusDelivering',
  done: 'statusDone',
  cancelled: 'statusCancelled',
}

export const DELIVERY_LABELS = {
  city: 'deliveryCity',
  country: 'deliveryCountry',
  pickup: 'deliveryPickup',
}

export const PAYMENT_LABELS = {
  card: 'paymentCard',
  cash: 'paymentCash',
}

export const PAGE_SIZE = 12
