import { api } from "@/lib/axios";

interface UpdateSectorRequest {
  sectorId: string
  body: {
    name?: string
    supervisorEmail?: string
  }
}


export async function updateSector({
  sectorId,
  body
}: UpdateSectorRequest): Promise<void> {
  await api.put(`/sectors/${sectorId}`, {
    name: body.name,
    supervisorEmail: body.supervisorEmail
  })
}