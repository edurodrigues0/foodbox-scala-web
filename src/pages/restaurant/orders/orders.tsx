import { useQuery } from "@tanstack/react-query"
import { OrdersCard } from "./orders-card"
import { getCurrentOrders } from "@/api/get-current-orders"
import { OrdersCardSkeleton } from "./orders-card-skeleton"
import { getProfile } from "@/api/get-profile"

export function Orders() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!profile?.user.restaurant_id) {
        return null
      }
      
      return await getCurrentOrders(profile.user.restaurant_id)
    },
    enabled: !!profile?.user.restaurant_id,
    refetchInterval: 1000 * 60 * 1, // 1 minutes
    staleTime: 1000 * 60 * 1, // 1 minutes
  })

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Pedidos
        </h1>

        <div className="grid grid-cols-2 gap-4">
          { isLoadingOrders && (
            <>
              <OrdersCardSkeleton />
              <OrdersCardSkeleton />
            </>
          )}
          { result && result.current_orders.length === 0 && (
            <div className="p-4">
              <span className="text-secondary-foreground text-2xl">
                Nenhum pedido no momento.
              </span>
            </div>
          )}

          { result && result.current_orders.map((item) => {
            return (
              <OrdersCard key={item.unit} currentOrders={item} />
            )
          })}
        </div>

        <div className="mt-10">
          <ul className="text-sm text-secondary-foreground flex flex-col gap-4 ml-5">
            <li>Pedidos da manhã serão encerrados às 8h</li>
            <li>Pedidos da tarde serão encerrados às 14h</li>
            <li>Pedidos da tarde serão encerrados às 00h</li>
          </ul>
        </div>
      </div>
    </div>
  )
}