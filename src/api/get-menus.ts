import { api } from "@/lib/axios";

export interface GetMenusResponse {
  menus: [
    {
      "id": string
      "name": string
      "created_at": string
      "service_date": string
    }
  ]
  meta: {
    "page_index": number
    "per_page": number
    "total_count": number
  }
}

export async function getMenus(): Promise<GetMenusResponse> {
  const response = await api.get('/menus')

  return response.data
}