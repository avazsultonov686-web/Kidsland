import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchProductById,
  fetchProducts,
  fetchProductsPaginated,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  uploadProductImages,
} from '../services/products'

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  })
}

export function useProductsInfinite(filters = {}) {
  return useInfiniteQuery({
    queryKey: ['products-infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsPaginated({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
    initialPageParam: 0,
  })
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  })
}

export function useProductMutations() {
  const qc = useQueryClient()

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['products'] })
    qc.invalidateQueries({ queryKey: ['products-infinite'] })
  }

  return {
    create: useMutation({
      mutationFn: createProduct,
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: ({ id, data }) => updateProduct(id, data),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: deleteProduct,
      onSuccess: invalidate,
    }),
    toggleActive: useMutation({
      mutationFn: ({ id, is_active }) => toggleProductActive(id, is_active),
      onSuccess: invalidate,
    }),
    uploadImages: useMutation({
      mutationFn: ({ productId, files }) => uploadProductImages(productId, files),
      onSuccess: (_, { productId }) => {
        invalidate()
        qc.invalidateQueries({ queryKey: ['product', productId] })
      },
    }),
  }
}
