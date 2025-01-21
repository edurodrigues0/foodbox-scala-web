import { api } from "@/lib/axios"

export interface AuthenticateBody {
  email: string
  password: string
}

export interface AuthenticateResponse {
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

export async function authenticate({
  email,
  password
}: AuthenticateBody): Promise<AuthenticateResponse> {
  const response = await api.post('/auth/login', {
    email,
    password,
  })

  return response.data
}