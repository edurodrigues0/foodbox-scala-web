import { api } from "@/lib/axios"

export interface GetOrdersBySectorQuery {
  pageIndex?: number | null
  colaboratorName?: string | null
}

export interface GetOrdersBySectorResponse {
  orders: {
    id: string
    colaborator: string
    menu: string
    date: string
  }[]
  meta: {
    page_index: number
    per_page: number
    total_count: number
  }
}

export async function getOrdersBySector({
  pageIndex,
  colaboratorName
}: GetOrdersBySectorQuery): Promise<GetOrdersBySectorResponse> {
  const response = await api.get('/orders/sector', {
    params: {
      pageIndex,
      colaboratorName,
    }
  })

  return response.data
}