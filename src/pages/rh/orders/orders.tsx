import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table"
import { OrdersTableRow } from "./orders-table-row"
import { OrdersTableFilters } from "./orders-table-filters"
import { Pagination } from "@/components/pagination"
import { useAuth } from "@/context/auth-context"
import { OrdersTotalTableRow } from "./orders-total-table-row"
import { OrdersTotalTableFilters } from "./orders-total-table-filters"
import { Button } from "@/components/ui/button"

export function Orders() {
  const { user } = useAuth()
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Pedidos
        </h1>

        { user?.role === 'supervisor' && (
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
              </TableBody>
            </Table>

            <Pagination
              pageIndex={0}
              perPage={10}
              totalCount={10}
              onPageChange={() => {}}
            />
          </div>
        )}

        { user?.role === 'rh' && (
          <div className="flex flex-1 flex-col p-4 gap-4">
            <OrdersTotalTableFilters />

            <Table>
              <TableHeader>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Total</TableHead>
              </TableHeader>

              <TableBody>
                <OrdersTotalTableRow />
                <OrdersTotalTableRow />
                <OrdersTotalTableRow />
              </TableBody>
            </Table>

            <div className="grid grid-cols-4 gap-32">
              <Button className="col-span-1">
                Baixar
              </Button>

              <Pagination
                pageIndex={0}
                perPage={10}
                totalCount={10}
                onPageChange={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}