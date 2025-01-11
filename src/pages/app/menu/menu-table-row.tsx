import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, Trash } from "lucide-react";

interface MenuTableRowProps {
  data: {
    name: string
    created_at: string
    service_date: string
  }
}

export function MenuTableRow({
  data
}: MenuTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        { data.name }
      </TableCell>

      <TableCell>
        Arroz, Feijão, Ovo frito, Couve-flor
      </TableCell>

      <TableCell>
        { data.service_date }
      </TableCell>

      <TableCell>
        { data.created_at }
      </TableCell>

      <TableCell>
        <Edit2 className="w-4 h-4" />
      </TableCell>

      <TableCell>
        <Trash className="w-4 h-4 text-red-700 dark:text-red-500" />
      </TableCell>
    </TableRow>
  )
}