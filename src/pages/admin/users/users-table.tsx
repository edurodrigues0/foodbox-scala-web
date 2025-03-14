import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface User {
  id: string
  role: string
  user_name: string
  sector_name: string | null
  unit_name: string | null
}

interface UsersTableRowProps {
  data: User
  onDeleteUser: (userId: string) => void
  isDeleteUserLoading: boolean
}

export function UsersTableRow({
  data,
  onDeleteUser,
  isDeleteUserLoading,
}: UsersTableRowProps) {
  return (
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
        <button
          className="h-4 w-4 text-primary"
          onClick={() => onDeleteUser(data.id)}
          disabled={isDeleteUserLoading}
        >
          <X />
        </button>
      </TableCell>
    </TableRow>
  )
}