import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";

interface Unit {
  unit_code: number
  unit_name: string
}

interface UnitsTableRowProps {
  data: Unit
}

export function UnitsTableRow({ data }: UnitsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        { data.unit_code }
      </TableCell>

      <TableCell>
        { data.unit_name }
      </TableCell>

      <TableCell>
        <button className="h-4 w-4">
          <Edit2 size={18} />
        </button>
      </TableCell>
    </TableRow>
  )
}