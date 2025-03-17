import { api } from "@/lib/axios";

interface GetOrdersForCurrentBillingCycleResponse {
  spent_in_cents: number
  total: number
}

export async function getOrdersForCurrentBillingCycle(
  cpf: string
): Promise<GetOrdersForCurrentBillingCycleResponse> {
  const response = await api.get('/orders-for-current-billing-cycle', {
    params: {
      cpf,
    }
  })

  return response.data
}