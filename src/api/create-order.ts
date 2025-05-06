import { api } from "@/lib/axios"

export interface CreateOrderBody {
  unitId: string,
  registration: number
  menuId: string
  orderDate: string
  restaurantId: string
}

export async function createOrder({ unitId, registration, menuId, orderDate, restaurantId }: CreateOrderBody) {
  
  const response = await api.post('/orders', {
    unitId,
    registration,
    restaurantId,
    menuId,
    orderDate,
  })

  return response.data
}