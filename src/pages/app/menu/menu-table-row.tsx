import { DeleteMenuParams } from "@/api/delete-menu";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit2, Trash } from "lucide-react";
import { UpdateMenuDialog } from "./update-menu-dialog";
import { useState } from "react";

interface MenuTableRowProps {
  data: {
    id: string,
    name: string
    created_at: string
    service_date: string
    description: string[]
  }
  onDeleteMenu: ({ menuId }: DeleteMenuParams) => void
}

export function MenuTableRow({
  data,
  onDeleteMenu,
}: MenuTableRowProps) {
  const [isStorageMenuOpen, setIsStorageMenuOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        { data.name.toUpperCase() }
      </TableCell>

      <TableCell className="truncate">
        { data.description.join(', ').toUpperCase() }
      </TableCell>

      <TableCell>
        { new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(data.service_date)) }
      </TableCell>

      <TableCell>
        { new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }).format(new Date(data.created_at)) }
      </TableCell>

      <Dialog
        open={isStorageMenuOpen}
        onOpenChange={() => setIsStorageMenuOpen(!isStorageMenuOpen)}
      >
        <DialogTrigger asChild>
          <TableCell>
            <button className="p-1 rounded-md hover:text-gray-500 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </TableCell>
        </DialogTrigger>

        <UpdateMenuDialog open={isStorageMenuOpen} menuId={data.id}  />
      </Dialog>

      <TableCell>
        <button
          className="p-1 rounded-md hover:text-gray-500 transition-colors"
          onClick={() => onDeleteMenu({ menuId: data.id })}
        >
          <Trash className="w-4 h-4 text-red-700 dark:text-red-500" />
        </button>
      </TableCell>
    </TableRow>
  )
}