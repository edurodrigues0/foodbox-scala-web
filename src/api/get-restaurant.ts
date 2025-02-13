import { api } from "@/lib/axios";

export interface GetRestaurantResponse {
  restaurant: {
    id: string
    name: string
    manager: {
      name: string,
      email: string
    }
  }
}

export async function getRestaurant(
  restaurantId: string
): Promise<GetRestaurantResponse> {
  const response = await api.get(`/restaurants/${restaurantId}`)

  return response.data
}