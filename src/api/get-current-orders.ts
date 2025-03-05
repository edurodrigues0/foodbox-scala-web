import { api } from "@/lib/axios";

export interface GetCurrentOrdersResponse {
  current_orders: {
    unit: string
    orders: {
      sector: string
      total_orders: number
    }[]
  }[]
}

export async function getCurrentOrders(
  retaurantId: string
): Promise<GetCurrentOrdersResponse> {
  const response = await api(`/orders/${retaurantId}`)

  return response.data
}
