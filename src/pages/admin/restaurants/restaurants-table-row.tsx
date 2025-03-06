import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { UpdateRestaurantDialog } from "./update-restaurant-dialog";
import { useState } from "react";

interface RestaurantsTableRowProps {
  data: {
    id: string
    name: string
    manager_name: string
    units: string[]
  }
}

export function RestaurantsTableRow({
  data
}: RestaurantsTableRowProps) {
  const [ isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        { data.units.sort().join(', ') }
      </TableCell>

      <TableCell>
        { data.name }
      </TableCell>

      <TableCell>
        { data.manager_name }
      </TableCell>

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogTrigger asChild>
          <TableCell>
            <button className="h-4 w-4">
              <Edit2 size={18} />
            </button>
          </TableCell>
        </DialogTrigger>

        <UpdateRestaurantDialog open={isDialogOpen} restaurantId={data.id} />
      </Dialog>
    </TableRow>
  )
}