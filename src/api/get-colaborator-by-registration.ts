import { api } from "@/lib/axios";

interface Colaborator {
  colaborator_id: string
  colaborator_name: string
  colaborator_registration: number
  sector_name: string
  unit_name: string
}

export interface GetColaboratorResponse {
  colaborator: Colaborator
}

export async function getColaboratorByRegistration(
  registration: number
): Promise<GetColaboratorResponse> {
  const response = await api(`/collaborators/${registration}/registration`)

  return response.data
}