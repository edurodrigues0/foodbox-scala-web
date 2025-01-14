import { api } from "@/lib/axios";
import { Menu } from "@/types/menu";

export interface GetMenusResponse {
  menus: Menu[]
  meta: {
    page_index: number
    per_page: number
    total_count: number
  }
}

export interface GetMenusQuery {
  pageIndex?: number | null
}

export async function getMenus({
  pageIndex
}: GetMenusQuery): Promise<GetMenusResponse> {
  const response = await api.get('/menus', {
    params: {
      pageIndex,
    }
  })

  return response.data
}