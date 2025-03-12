import { api } from "@/lib/axios";

export interface DeleteOrderParams {
  orderId: string
}

export async function deleteOrder({
  orderId
}: DeleteOrderParams) {
    const response = await api.delete(`/order/${orderId}`)

    return response.status
}