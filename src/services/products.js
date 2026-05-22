// import { supabase } from '../lib/supabase'

// Заглушки для будущего подключения к Supabase
// После подключения замените на реальные запросы:
//
// export async function fetchProducts(filters = {}) {
//   let query = supabase.from('products').select('*')
//   if (filters.category) query = query.eq('category', filters.category)
//   const { data, error } = await query
//   if (error) throw error
//   return data
// }
//
// export async function fetchProductById(id) {
//   const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
//   if (error) throw error
//   return data
// }

export async function fetchProducts() {
  return []
}

export async function fetchProductById() {
  return null
}
