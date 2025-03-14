import { api } from "@/lib/axios"

export interface CreateColaboratorBody {
  name: string
  registration: number
  cpf: string
  sectorId: string
}

export async function createColaborator({
  name,
  registration,
  cpf,
  sectorId
}: CreateColaboratorBody): Promise<{colaborator_name: string}> {
  const response = await api.post('/collaborators', {
    name,
    registration,
    cpf,
    sectorId,
  })

  return response.data
}