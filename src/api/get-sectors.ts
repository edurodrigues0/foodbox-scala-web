import { api } from "@/lib/axios";

interface Sector {
  id: string
  name: string
}

export interface GetSectorsResponse {
  sectors: Sector[]
}

export async function getSectors(unitId: string): Promise<GetSectorsResponse> {
  const response = await api.get(`/sectors/${unitId}/unit`)

  return response.data
}