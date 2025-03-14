import { api } from "@/lib/axios";

interface Colaborator {
  colaborator_id: string
  colaborator_name: string
  colaborator_registration: number
  colaborator_cpf: string
  sector_name: string
  unit_name: string
}

export interface GetColaboratorResponse {
  colaborator: Colaborator
}

export async function getColaborator(
  colaboratorId: string
): Promise<GetColaboratorResponse> {
  const response = await api.get(`/collaborators/${colaboratorId}`)

  return response.data
}