import { api } from "@/lib/axios"

export interface UpdateMenuParams {
  menuId: string
  name?: string
  description?: string[]
  allergens?: string
  serviceDate?: string
}

export async function updateMenu({
  menuId,
  name,
  allergens,
  description,
  serviceDate,
}: UpdateMenuParams) {
  await api.put(`/menus/${menuId}`, {
    name,
    description,
    allergens,
    serviceDate,
  })
}