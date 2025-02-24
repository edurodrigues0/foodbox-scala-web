import { api } from "@/lib/axios"

interface GetAllOrdersResponse {
  orders: {
    id: string
    colaborator: string
    registration: number,
    cpf: string
    total_spent_in_cents: number
    total_orders: number
  }[]
  meta: {
    page_index: number
    per_page: number
    total_count: number
  }
}

interface GetAllOrdersQuery {
  pageIndex?: number | null
  sectorId?: string | null
}

export async function getAllOrders({
  pageIndex,
  sectorId,
}: GetAllOrdersQuery): Promise<GetAllOrdersResponse> {
  const response = await api.get("/orders/recent", {
    params: {
      pageIndex,
      sectorId,
    }
  })

  return response.data
}
