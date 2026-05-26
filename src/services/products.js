import { supabase } from '../lib/supabase'
import { PAGE_SIZE } from '../lib/constants'

function mapProduct(row) {
  const images = row.product_images || []
  const main = images.find((i) => i.is_main) || images[0]
  return {
    ...row,
    price: Number(row.price),
    image: main?.url || null,
    images: images.sort((a, b) => a.order_num - b.order_num),
  }
}

export async function fetchProducts({ category, search, priceMin, priceMax, ageMin, ageMax, sort } = {}) {
  let query = supabase
    .from('products')
    .select('*, product_images(id, url, order_num, is_main)')
    .eq('is_active', true)

  if (category) query = query.eq('category', category)
  if (priceMin != null) query = query.gte('price', priceMin)
  if (priceMax != null) query = query.lte('price', priceMax)
  if (ageMin != null) query = query.gte('age_max', ageMin)
  if (ageMax != null) query = query.lte('age_min', ageMax)

  if (sort === 'cheap') query = query.order('price', { ascending: true })
  else if (sort === 'expensive') query = query.order('price', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data, error } = await query
  if (error) throw error

  let items = (data || []).map(mapProduct)

  if (search?.trim()) {
    const q = search.trim().toLowerCase()
    items = items.filter(
      (p) =>
        p.name_ru?.toLowerCase().includes(q) ||
        p.name_tj?.toLowerCase().includes(q)
    )
  }

  return items
}

export async function fetchProductsPaginated({ page = 0, ...filters } = {}) {
  const all = await fetchProducts(filters)
  const start = page * PAGE_SIZE
  const items = all.slice(start, start + PAGE_SIZE)
  return { items, hasMore: start + PAGE_SIZE < all.length, total: all.length }
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(id, url, order_num, is_main)')
    .eq('id', id)
    .single()

  if (error) throw error
  return mapProduct(data)
}

export async function fetchAllProductsAdmin() {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(id, url, order_num, is_main)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(mapProduct)
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function toggleProductActive(id, is_active) {
  return updateProduct(id, { is_active })
}

export async function uploadProductImages(productId, files) {
  const results = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const ext = file.name.split('.').pop()
    const path = `${productId}/${Date.now()}-${i}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path)

    const { data, error } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        url: urlData.publicUrl,
        order_num: i,
        is_main: i === 0,
      })
      .select()
      .single()

    if (error) throw error
    results.push(data)
  }

  return results
}

export async function deleteProductImage(imageId) {
  const { error } = await supabase.from('product_images').delete().eq('id', imageId)
  if (error) throw error
}
