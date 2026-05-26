import { supabase } from '../lib/supabase'

export async function upsertUser(user) {
  const { data, error } = await supabase
    .from('users')
    .upsert(user, { onConflict: 'telegram_id' })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function checkIsAdmin(telegramId) {
  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('telegram_id', telegramId)
    .maybeSingle()

  if (error) return false
  return Boolean(data)
}

export async function fetchFavorites(telegramId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('product_id')
    .eq('user_telegram_id', telegramId)

  if (error) throw error
  return (data || []).map((f) => f.product_id)
}

export async function addFavorite(telegramId, productId) {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_telegram_id: telegramId, product_id: productId })

  if (error) throw error
}

export async function removeFavorite(telegramId, productId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_telegram_id', telegramId)
    .eq('product_id', productId)

  if (error) throw error
}

export async function fetchFavoriteProducts(telegramId) {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      product_id,
      products (
        *,
        product_images ( id, url, order_num, is_main )
      )
    `)
    .eq('user_telegram_id', telegramId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || [])
    .map((f) => f.products)
    .filter(Boolean)
    .map((p) => {
      const images = p.product_images || []
      const main = images.find((i) => i.is_main) || images[0]
      return { ...p, price: Number(p.price), image: main?.url || null }
    })
}
