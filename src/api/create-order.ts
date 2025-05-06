import { api } from "@/lib/axios"

export interface CreateOrderBody {
  registration: number
  menuId: string
  orderDate: string
  restaurantId: string
}

export async function createOrder({ registration, menuId, orderDate, restaurantId }: CreateOrderBody) {
  
  const response = await api.post('/orders', {
    registration,
    restaurantId,
    menuId,
    orderDate,
  })

  return response.data
}