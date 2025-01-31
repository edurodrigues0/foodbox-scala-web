import { api } from "@/lib/axios";

interface UpdateUnitRequest {
  unitId: string
  body: {
    name?: string
    unit?: number
  }
}

export async function updateUnit({
  unitId,
  body
}: UpdateUnitRequest): Promise<void> {
  await api.put(`/units/${unitId}`, {
    name: body.name,
    unity: body.unit,
  })
}