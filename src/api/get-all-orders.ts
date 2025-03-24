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
  from?: Date
  to?: Date
  colaboratorName?: string | null
  unit?: string | null
  registration?: string | null
  cpf?: string | null
}

export async function getAllOrders({
  pageIndex,
  sectorId,
  from,
  to,
  colaboratorName,
  unit,
  registration,
  cpf,
}: GetAllOrdersQuery): Promise<GetAllOrdersResponse> {
  const response = await api.get("/orders/recent", {
    params: {
      pageIndex,
      sectorId,
      from,
      to,
      colaboratorName,
      unit,
      registration,
      cpf,
    }
  })

  return response.data
}
