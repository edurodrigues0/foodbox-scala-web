import { api } from "@/lib/axios";

export interface CreateSectorBody {
  name: string
  unitId: string
}

export interface CreateSectorResponse {
  sector_name: string
}

export async function createSector({
  name,
  unitId,
}: CreateSectorBody): Promise<CreateSectorResponse> {
  const response = await api.post('/sectors', {
    name,
    unitId,
  })

  return response.data
}