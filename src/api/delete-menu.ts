import { api } from "@/lib/axios";

export interface DeleteMenuParams {
  menuId: string
}

export async function deleteMenu({
  menuId
}: DeleteMenuParams) {
    const response = await api.delete(`/menus/${menuId}`)

    return response.status
}