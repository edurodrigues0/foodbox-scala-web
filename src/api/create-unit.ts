import { api } from "@/lib/axios";

export interface CreateUnitBody {
  name: string
  unit: number
}

export interface CreateUnitResponse {
  unity_name: string
}

export async function createUnit({ name, unit }: CreateUnitBody): Promise<CreateUnitResponse> {
  const response = await api.post('/units', {
    name,
    unity: unit,
  })

  return response.data
}