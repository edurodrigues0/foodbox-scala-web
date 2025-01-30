import { api } from "@/lib/axios"

export interface UpdateColaboratorProps {
  colaboratorId: string
  body: {
    name?: string
    registration?: number
    sectorId?: string
  }
}

export async function updateColaborator({
  colaboratorId,
  body
}: UpdateColaboratorProps) {
  const { name, registration, sectorId } = body
  await api.put(`/colaborators/${colaboratorId}`, {
    name,
    registration,
    sectorId
  })  
}