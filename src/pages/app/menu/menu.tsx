import { MenuDialog } from "@/pages/app/menu/menu-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { MenuTableRow } from "./menu-table-row";
import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMenus } from "@/api/get-menus";
import { MenuTableSkeleton } from "./menu-table-skeleton";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { deleteMenu, DeleteMenuParams } from "@/api/delete-menu";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function Menu() {
  const queryClient = useQueryClient()
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

  const { mutateAsync: deleteMenuFn, isPending: isDeleteMenu } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu', pageIndex] })
    },
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }

  async function handleDeleteMenu({ menuId }: DeleteMenuParams) {
    try {
      await deleteMenuFn({
        menuId,
      })

      toast.success('O prato foi deletado com sucesso!', {
        position: 'top-center'
      })
    } catch (error) {
      if (error === 'Unauthorized') {
        console.log('sim')
      }

      toast.error('Não foi possível deleter esse prato!', {
        position: 'top-center'
      })
    }
  }

  return (
    <Dialog>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            Cardápio
          </h1>

          <div className="flex flex-col p-4">
            <DialogTrigger asChild>
              <Button className="font-semibold w-fit">
                <PlusCircle className="w-4 h-4" />
                Adicionar novo cardapio
              </Button>
            </DialogTrigger>
          </div>

          <Table>
            <TableHeader>
              <TableHead>Prato</TableHead>
              <TableHead>Acompanhamentos</TableHead>
              <TableHead>Data de Serviço</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableHeader>

            <TableBody>
              { isLoadingMenus && <MenuTableSkeleton />}
              { result && result.menus.map((menu) => {
                return (
                  <MenuTableRow
                    key={menu.id}
                    data={menu}
                    onDeleteMenu={handleDeleteMenu}
                  />
                )
              })}
            </TableBody>
          </Table>

          { result && (
            <Pagination
              pageIndex={result.meta.page_index}
              perPage={result.meta.per_page}
              totalCount={result.meta.total_count}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>

      <MenuDialog />
    </Dialog>
  )
}