import { z } from "zod"
import { Pagination } from "@/components/pagination"
import { TableHeader, TableHead, TableBody, Table } from "@/components/ui/table"
import { MenuTableSkeleton } from "@/pages/restaurant/menu/menu-table-skeleton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { OrdersTableRow } from "./orders-table-row"
import { getOrdersBySector } from "@/api/get-orders-by-sector"
import { deleteOrder } from "@/api/delete-order"
import { toast } from "sonner"

export function Orders() {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const colaboratorName = searchParams.get('nome')

  const { data: result, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrdersBySector({
      pageIndex,
      colaboratorName,
    }),
  })

  const { mutateAsync: deleteOrderFn, isPending: _isDeleteOrder } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', pageIndex] })
    },
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }

  async function handleDeleteOrder(orderId: string) {
    try {
      await deleteOrderFn({
        orderId,
      })

      toast.success('Pedido cancelado com sucesso!', {
        position: 'top-center'
      })
    }
    catch (error) {
      console.log(error)

      toast.error('Erro ao cancelar pedido!', {
        position: 'top-center'
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      {/* <OrdersTableFilters /> */}

      <Table>
        <TableHeader>
          <TableHead>Nome</TableHead>
          <TableHead>Marmita</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Cancelar</TableHead>
        </TableHeader>

        <TableBody>
          { isOrdersLoading && <MenuTableSkeleton /> }
          { result && result.orders.map((order) => (
            <OrdersTableRow
              key={order.id}
              data={order}
              onDeleteOrder={handleDeleteOrder}
            />
          )) }
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
  )
}