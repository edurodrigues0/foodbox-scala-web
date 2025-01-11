import { NewMenuDialog } from "@/components/new-menu-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { MenuTableRow } from "./menu-table-row";
import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getMenus } from "@/api/get-menus";
import { MenuTableSkeleton } from "./menu-table-skeleton";

export function Menu() {

  const { data: result, isLoading: isLoadingMenus } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenus
  })

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
              <TableHead>Servido no dia</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableHeader>

            <TableBody>
              { isLoadingMenus && <MenuTableSkeleton />}
              { result && result.menus.map((menu) => {
                return <MenuTableRow key={menu.id} data={menu} />
              })}
            </TableBody>
          </Table>

          { result && (
            <Pagination
              pageIndex={result.meta.page_index}
              perPage={result.meta.per_page}
              totalCount={result.meta.total_count}
              onPageChange={() => {}}
            />
          )}
        </div>
      </div>

      <NewMenuDialog />
    </Dialog>
  )
}