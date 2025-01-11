import { api } from "@/lib/axios"

interface Unit {
  unit_id: string
  unit_name: string
  unit_code: number
  restaurant_id: string | null
  restaurant_name: string | null
}

export interface GetUnitsResponse {
  units_and_restaurants: Unit[]
}

export async function getUnits(): Promise<GetUnitsResponse> {
  const response = await api.get('/units')

  return response.data
}