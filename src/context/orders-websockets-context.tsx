import { queryClient } from "@/lib/react-query";

type WebHookMessage =
  | { kind: 'order_created'; value: { id: string } }
  | { kind: 'order_cancelled'; value: { id: string } };

interface OrdersWebSocketsContextParams {
  restaurantId: string;
}

export function ordersWebSocketsContext({ restaurantId }: OrdersWebSocketsContextParams) {
  const ws = new WebSocket(`ws://localhost:3333/ws/restaurants/${restaurantId}`);

  ws.onopen = () => {
    console.log('Websocket connected!');
  };

  ws.onclose = () => {
    console.log('Websocket connection closed!');
  };

  ws.onmessage = (event) => {
    const data: WebHookMessage = JSON.parse(event.data);

    switch (data.kind) {
      case 'order_created':
        queryClient.setQueryData(['orders', restaurantId], (state: { orders: { id: string }[] } | undefined) => {
          return {
            orders: [
              ...(state?.orders || []),
              { id: data.value.id },
            ],
          };
        });
        break;

      case 'order_cancelled':
        queryClient.setQueryData(['orders', restaurantId], (state: { orders: { id: string }[] } | undefined) => {
          if (!state) return state;

          return {
            orders: state.orders.filter((order) => order.id !== data.value.id),
          };
        });
        break;

      default:
        console.warn('Tipo de mensagem desconhecido:', data);
        break;
    }
  };

  return () => {
    ws.close();
  };
}