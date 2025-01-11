import { api } from "@/lib/axios"

interface Menu {
  menu_id: string
  menu_name: string
  menu_description: [string]
  menu_allergens: string | null
  service_date: string
}

export interface GetMenusTodayAndTomorrow {
  menus: Menu[]
}

export async function getMenusTodayAndTomorrow(unitId: string): Promise<GetMenusTodayAndTomorrow> {
  const response = await api.get(`/menus/${unitId}/today-and-tomorrow`)

  return response.data
}