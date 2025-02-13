import { api } from "@/lib/axios";

export interface CreateRestaurantBody {
  restaurantName: string
  userName: string
  userEmail: string
  unitIds: string[]
  password: string
}

export interface CreateRestaurantResponse {
  restaurant_name: string
}

export async function createRestaurant({
  userName,
  userEmail,
  restaurantName,
  unitIds,
  password,
}: CreateRestaurantBody): Promise<CreateRestaurantResponse> {
  const response = await api.post('/restaurants', {
    userEmail,
    userName,
    restaurantName,
    unitIds,
    password,
  })

  return response.data
}