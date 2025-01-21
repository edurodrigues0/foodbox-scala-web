import { api } from "@/lib/axios";

export interface RefreshResponse {
  auth_metadata: {
    token: string
  }
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export async function refresh(): Promise<RefreshResponse> {
  const response = await api.get('/auth/refresh')

  return response.data
}