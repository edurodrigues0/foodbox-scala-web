import { DeleteMenuParams } from "@/api/delete-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
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
        <Button variant="ghost" asChild className="rounded-md hover:text-green-500 transition-colors">
          <Link to={`/colaboradores/${data.colaborator_id}/editar`}>
            <Edit2 className="w-5 h-5" />
          </Link>
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" disabled>
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-800 transition-colors"/>
        </Button>
      </TableCell>
    </TableRow>
  )
}