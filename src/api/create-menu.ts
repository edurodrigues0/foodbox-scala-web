import { api } from "@/lib/axios"

export interface CreateMenuBody {
  name: string
  serviceDate: string
  description: string[],
  allergens: string | null
}

export async function createMenu({
  name,
  description,
  serviceDate,
  allergens,
}: CreateMenuBody): Promise<{menu_name: string}> {
  const response = await api.post('/menus', {
    name,
    description,
    serviceDate,
    allergens,
  })

  return response.data
}