import { DeleteMenuParams } from "@/api/delete-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Colaborator {
  colaborator_id: string
  colaborator_name: string
  colaborator_registration: number
  sector_name: string
  unit_name: string
}

interface CollaboratorsTableRowProps {
  data: Colaborator
  onDeleteColaborator?: ({ menuId }: DeleteMenuParams) => void
}

export function CollaboratorsTableRow({
  data,
}: CollaboratorsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        { data.colaborator_registration }
      </TableCell>

      <TableCell>
        { data.colaborator_name.toUpperCase() }
      </TableCell>

      <TableCell>
        { data.unit_name.toUpperCase() }
      </TableCell>

      <TableCell>
        { data.sector_name.toUpperCase() }
      </TableCell>

      <TableCell>
        <Link to={`/colaboradores/${data.colaborator_id}/editar`} className="p-1 rounded-md hover:text-gray-500 transition-colors">
          <Edit2 className="w-4 h-4" />
        </Link>
      </TableCell>
    </TableRow>
  )
}