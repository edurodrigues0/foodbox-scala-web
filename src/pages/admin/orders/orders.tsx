import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table"
import { Pagination } from "@/components/pagination"
import { useAuth } from "@/context/auth-context"
import { OrdersTotalTableRow } from "./orders-total-table-row"
import { OrdersTotalTableFilters } from "./orders-total-table-filters"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "@/api/get-all-orders"

export function Orders() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
  .number()
  .transform((page) => page - 1)
  .parse(searchParams.get('page') ?? '1')

  const {
    data: result,
    isLoading: isOrdersLoading,
  } = useQuery({
    queryFn: () => getAllOrders({
      pageIndex,
    }),
    queryKey: ['orders', pageIndex],
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Pedidos
        </h1>

        { user?.role === 'rh' && (
          <div className="flex flex-1 flex-col p-4 gap-4">
            <OrdersTotalTableFilters />

            <Table>
              <TableHeader>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Total</TableHead>
              </TableHeader>

              <TableBody>
                { result && result.orders.map((order) => {
                  return (
                    <OrdersTotalTableRow data={order} />
                  )
                })}
              </TableBody>
            </Table>

            <div className="grid grid-cols-4 gap-32">
              <Button className="col-span-1">
                Baixar
              </Button>

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
        )}
      </div>
    </div>
  )
}