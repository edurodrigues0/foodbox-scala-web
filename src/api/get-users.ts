import { api } from "@/lib/axios";

interface User {
  id: string
  user_name: string
  unit_name: string
  sector_name: string
  role: string
}

export interface GetUsersResponse {
  users: User[]
  meta: {
    page_index: number
    per_page: number
    total_count: number
  }
}

export interface GetUsersQuery {
  pageIndex?: number | null
}

export async function getUsers(): Promise<GetUsersResponse> {
  const result = await api.get('/users')

  return result.data
}