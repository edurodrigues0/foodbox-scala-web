import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CurrentOrders {
  unit: string
  orders: {
    sector: string
    total_orders: number
  }[]
}

export interface OrdersCardProps {
  currentOrders: CurrentOrders;
}

export function OrdersCard({ currentOrders }: OrdersCardProps) {
  return (
    <Card>
      <CardHeader>{currentOrders.unit}</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentOrders.orders.map((order) => {
              return (
                <TableRow key={`${order.sector} + ${order.total_orders}`}>
                  <TableCell>{order.sector.toLocaleUpperCase()}</TableCell>
                  <TableCell className="text-right">
                    {order.total_orders}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
