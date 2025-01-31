import { api } from "@/lib/axios";

interface Unit {
  id: string
  name: string
  unity: number
}

interface GetUnitResponse {
  unit: Unit
}

export async function getUnit(unitId: string): Promise<GetUnitResponse> {
  const response = await api.get(`/units/${unitId}`)

  return response.data
}