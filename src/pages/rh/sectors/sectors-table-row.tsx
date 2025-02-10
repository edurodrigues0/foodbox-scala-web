import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { Edit2 } from "lucide-react"
import { useState } from "react"
import { UpdateSectorDialog } from "./update-sector-dialog"

interface Sector {
  id: string
  unit_name: string
  sector_name: string
}

interface SectorsTableRowProps {
  data: Sector
}

export function SectorsTableRow({
  data
}: SectorsTableRowProps) {
  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        { data.unit_name.toLocaleUpperCase() }
      </TableCell>

      <TableCell>
         { data.sector_name.toLocaleUpperCase() }
      </TableCell>

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setDialogOpen(!isDialogOpen)}
      >
        <DialogTrigger asChild>
          <TableCell>
            <button className="h-4 w-4">
              <Edit2 size={18} />
            </button>
          </TableCell>
        </DialogTrigger>

        <UpdateSectorDialog open={isDialogOpen} sectorId={data.id} />
      </Dialog>
    </TableRow>
  )
}