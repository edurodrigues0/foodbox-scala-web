import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table"
import { OrdersTableRow } from "./orders-table-row"
import { MenuTableSkeleton } from "@/pages/app/menu/menu-table-skeleton"
import { OrdersTableFilters } from "./orders-table-filters"
import { Pagination } from "@/components/pagination"

export function Orders() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Pedidos
        </h1>

        <div className="flex flex-1 flex-col p-4 gap-4">
          <OrdersTableFilters />

          <Table>
            <TableHeader>
              <TableHead>Matricula</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead></TableHead>
            </TableHeader>

            <TableBody>
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
              <OrdersTableRow />
            </TableBody>
          </Table>

          <Pagination
            pageIndex={0}
            perPage={10}
            totalCount={10}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}