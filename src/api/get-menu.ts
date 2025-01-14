import { api } from "@/lib/axios"
import { Menu } from "@/types/menu"

export interface GetMenuQuery {
  menuId: string
}

export interface GetMenuResponse {
  menu: Menu
}

export async function getMenu({
  menuId
}: GetMenuQuery): Promise<GetMenuResponse> {
  const response = await api.get(`/menus/${menuId}`)

  return response.data
}