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
  unit?: string | null
  sector?: string | null
  registration?: string | null
}

export interface GetCollaboratorsResponse {
  collaborators: Colaborator[]
  meta: IPagination
}

export async function getCollaborators({
  pageIndex,
  colaboratorName,
  unit,
  sector,
  registration
}: GetCollaboratorsQuery): Promise<GetCollaboratorsResponse> {
  const response = await api.get('/collaborators', {
    params: {
      pageIndex,
      name: colaboratorName,
      unit,
      sector,
      registration,
    }
  })

  return response.data
}