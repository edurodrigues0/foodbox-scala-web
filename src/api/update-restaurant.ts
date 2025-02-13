import { api } from "@/lib/axios";

interface UpdateRestaurantRequest {
  restaurantId: string
  body: {
    name?: string
    unitId?: string
  }
}


export async function updateRestaurant({
  restaurantId,
  body,
}: UpdateRestaurantRequest): Promise<void> {
  await api.put(`/restaurants/${restaurantId}`, {
    name: body.name,
    unitId: body.unitId,
  })
}