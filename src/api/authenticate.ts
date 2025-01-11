import { api } from "@/lib/axios"

export interface AuthenticateBody {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticateBody) {
  await api.post('/auth/login', {
    email,
    password,
  })
}