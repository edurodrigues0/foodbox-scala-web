import { api } from "@/lib/axios"

export interface CreateOrderBody {
  cpf: string
  menuId: string
  orderDate: string
  restaurantId: string
}

export async function createOrder({ cpf, menuId, orderDate, restaurantId }: CreateOrderBody) {
  const { data } = await api.post('/orders', {
    cpf,
    restaurantId,
    menuId,
    orderDate,
  })

  return data
}