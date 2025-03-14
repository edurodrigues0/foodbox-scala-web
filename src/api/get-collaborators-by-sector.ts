import { api } from "@/lib/axios";
import { IPagination } from "@/types/pagination";

interface Colaborator {
  colaborator_id: string
  colaborator_name: string
  colaborator_registration: number
  sector_name: string
  unit_name: string
} 

export interface GetCollaboratorsQuery {
  pageIndex?: number | null
  colaboratorName?: string | null
  registration?: string | null
}

export interface GetCollaboratorsResponse {
  collaborators: Colaborator[]
  meta: IPagination
}

export async function getCollaboratorsBySector({
  pageIndex,
  colaboratorName,
  registration
}: GetCollaboratorsQuery): Promise<GetCollaboratorsResponse> {
  const response = await api.get('/collaborators/sector', {
    params: {
      pageIndex,
      name: colaboratorName,
      registration,
    }
  })

  return response.data
}