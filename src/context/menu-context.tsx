import { getMenus } from '@/api/get-menus'
import { Menu } from '@/types/menu'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

interface MenusContextProps {
  children: ReactNode
}

interface MenusContextData {
  menus: Menu[]
}

export const MenusContext = createContext({} as MenusContextData)

export function MenusContextProvider({ children }: MenusContextProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')
  
  
  const { data: result, isLoading: isLoadingMenus } = useQuery({
    queryKey: ['menu', pageIndex],
    queryFn: () => getMenus({
      pageIndex,
    })
  })

  return (
    <MenusContext.Provider value={{}}>
      { children }
    </MenusContext.Provider>
  )
}
