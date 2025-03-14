import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface Order {
  id: string
  colaborator: string
  date: string
  menu: string
}

interface OrdersTableRowProps {
  data: Order
  onDeleteOrder: (orderId: string) => void
}

export function OrdersTableRow({
  data,
  onDeleteOrder,
}: OrdersTableRowProps) {

  return (
    <TableRow>
      <TableCell>
        { data.colaborator }
      </TableCell>

      <TableCell>
        { data.menu.toUpperCase() }
      </TableCell>

      <TableCell>
        { new Intl.DateTimeFormat('pt-BR').format(new Date(data.date)) }
      </TableCell>

      <TableCell>
        <button
          className="p-1 rounded-md hover:text-gray-500 transition-colors"
          onClick={() => onDeleteOrder(data.id)}
          // disabled={isDeleteDisabled}
        >
          <X className="text-red-500" />
          <span className="sr-only">
            Cancelar
          </span>
        </button>
      </TableCell>
    </TableRow>
  )
}