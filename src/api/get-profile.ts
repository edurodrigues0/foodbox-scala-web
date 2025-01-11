import { api } from "@/lib/axios";

export interface GetProfileResponse {
  user: {
    id: string
    name: string
    email: string
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api('/me')

  return response.data
}