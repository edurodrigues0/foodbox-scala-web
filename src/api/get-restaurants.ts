import { api } from "@/lib/axios"

interface Restaurant {
  id: string
  name: string
  manager_name: string
  units: string[]
}

export interface GetRestaurantsResponse {
  restaurants: Restaurant[]
  meta: {
    page_index: number
    per_page: number
    total_count: number
  }
}

export interface GetRestaurantsQuery {
  pageIndex?: number | null
}

export async function getRestaurants({
  pageIndex
}: GetRestaurantsQuery): Promise<GetRestaurantsResponse> {
  const response = await api.get('/restaurants', {
    params: {
      pageIndex,
    }
  })

  return response.data
}