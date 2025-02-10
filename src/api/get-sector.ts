import { api } from "@/lib/axios";

interface Sector {
  id: string
  name: string
  unity: {
      name: string
  } | null
  supervisor: {
      id: string
      name: string
      email: string
  } | null
}

export interface GetSectorResponse {
  sector: Sector
}

export async function getSector(
  sectorId: string
): Promise<GetSectorResponse> {
  const response = await api.get(`/sectors/${sectorId}`)

  return response.data
}