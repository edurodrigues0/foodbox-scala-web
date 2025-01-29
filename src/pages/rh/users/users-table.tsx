import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, X } from "lucide-react";

interface User {
  id: string
  role: string
  user_name: string
  sector_name: string | null
  unit_name: string | null
}

interface UsersTableRowProps {
  data: User
}

export function UsersTableRow({ data }: UsersTableRowProps) {
  return(
    <TableRow>
      <TableCell>
        { data.user_name }
      </TableCell>

      <TableCell>
        { data.unit_name || 'Administrativo' }
      </TableCell>

      <TableCell>
        { data.sector_name || 'Administrativo' }
      </TableCell>

      <TableCell>
        <button className="h-4 w-4 text-primary">
          <X />
        </button>
      </TableCell>
    </TableRow>
  )
}