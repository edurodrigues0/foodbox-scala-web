import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

export function OrdersTableRow() {
  return (
    <TableRow>
      <TableCell>
        1166
      </TableCell>

      <TableCell>
        Eduardo Henrique de S Rodrigues
      </TableCell>

      <TableCell>
        Scala II
      </TableCell>

      <TableCell>
        Maturação de Parmesão
      </TableCell>

      <TableCell>
        Realizado
      </TableCell>

      <TableCell>
        <button className="p-1 rounded-md hover:text-gray-500 transition-colors">
          <X />
          <span className="sr-only">
            Cancelar
          </span>
        </button>
      </TableCell>
    </TableRow>
  )
}