import { api } from "@/lib/axios";
import { IPagination } from "@/types/pagination";

interface Colaborator {
  colaborator_id: string
  colaborator_name: string
  colaborator_registration: number
  sector_name: string
  unit_name: string
} 

export interface GetColaboratorsQuery {
  pageIndex?: number | null
  colaboratorName?: string | null
  registration?: string | null
}

export interface GetColaboratorsResponse {
  colaborators: Colaborator[]
  meta: IPagination
}

export async function getColaboratorsBySector({
  pageIndex,
  colaboratorName,
  registration
}: GetColaboratorsQuery): Promise<GetColaboratorsResponse> {
  const response = await api.get('/colaborators/sector', {
    params: {
      pageIndex,
      name: colaboratorName,
      registration,
    }
  })

  return response.data
}