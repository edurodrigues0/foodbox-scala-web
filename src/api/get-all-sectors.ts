import { api } from "@/lib/axios";
import { IPagination } from "@/types/pagination";

interface Sector {
  id: string
  unit_name: string
  sector_name: string
}

export interface GetAllSectorsResponse {
  sectors: Sector[],
  meta: IPagination,
}

export interface GetAllSectorsParams {
  pageIndex: number
  sector?: string | null,
  unit?: string | null,
}

export async function getAllSectors({
  pageIndex,
  sector,
  unit,
}: GetAllSectorsParams): Promise<GetAllSectorsResponse> {
  const response = await api.get('/sectors', {
    params: {
      pageIndex,
      sectorName: sector,
      unitName: unit,
    }
  })

  return response.data
}