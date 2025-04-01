import { api } from "@/lib/axios";

interface GetOrdersForCurrentBillingCycleResponse {
  spent_in_cents: number
  total: number
}

export async function getOrdersForCurrentBillingCycle(
  registration: number
): Promise<GetOrdersForCurrentBillingCycleResponse> {
  const response = await api.get('/orders-for-current-billing-cycle', {
    params: {
      registration,
    }
  })

  return response.data
}