// import { supabase } from '../lib/supabase'

// export async function createOrder(orderData) {
//   const { data, error } = await supabase.from('orders').insert([orderData]).select().single()
//   if (error) throw error
//   return data
// }
//
// export async function fetchUserOrders(userId) {
//   const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').eq('user_id', userId)
//   if (error) throw error
//   return data
// }

export async function createOrder() {
  return null
}

export async function fetchUserOrders() {
  return []
}
