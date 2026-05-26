import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchUserOrders,
  fetchAllOrders,
  fetchOrderById,
  createOrder,
  updateOrderStatus,
  fetchAdminStats,
} from '../services/orders'

export function useUserOrders(telegramId) {
  return useQuery({
    queryKey: ['orders', 'user', telegramId],
    queryFn: () => fetchUserOrders(telegramId),
    enabled: Boolean(telegramId),
  })
}

export function useAllOrders(status) {
  return useQuery({
    queryKey: ['orders', 'all', status],
    queryFn: () => fetchAllOrders(status),
  })
}

export function useOrder(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: Boolean(id),
  })
}

export function useCreateOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchAdminStats,
  })
}
