import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { UpdateUnitDialog } from "./update-unit-dialog";

interface Unit {
  unit_id: string
  unit_code: number
  unit_name: string
}

interface UnitsTableRowProps {
  data: Unit
}

export function UnitsTableRow({ data }: UnitsTableRowProps) {
  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog>
      <TableRow>
        <TableCell>
          { data.unit_code }
        </TableCell>

        <TableCell>
          { data.unit_name }
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

          <UpdateUnitDialog open={isDialogOpen} unitId={data.unit_id} />
        </Dialog>
      </TableRow>
    </Dialog>
  )
}