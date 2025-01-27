import { api } from "@/lib/axios";

export enum UserRoleEnum { admin, supervisor, restaurant, rh }

export interface RegisterUserBody {
  name: string
  email: string
  role: UserRoleEnum,
  restaurantName: string | undefined
  sectorId: string | undefined
}

export interface RegisterUserResponse {
  email: string
}

export async function registerUser({
  email,
  name,
  restaurantName,
  role,
  sectorId,
}: RegisterUserBody): Promise<RegisterUserResponse> {
  const response = await api.post('/users', {
    email,
    name,
    restaurantName,
    role,
    sectorId,
  })

  return response.data
}