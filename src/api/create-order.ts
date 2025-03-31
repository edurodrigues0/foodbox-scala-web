import { api } from "@/lib/axios"

export interface CreateOrderBody {
  registration: number
  menuId: string
  orderDate: string
  restaurantId: string
}

export async function createOrder({ registration, menuId, orderDate, restaurantId }: CreateOrderBody) {
  const { data } = await api.post('/orders', {
    registration,
    restaurantId,
    menuId,
    orderDate,
  })

  return data
}