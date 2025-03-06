import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Edit2, Trash } from 'lucide-react'

export function MenuTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell className="text-muted-foreground">
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>

        <TableCell>
          <Edit2 className="w-4 h-4" />
        </TableCell>

        <TableCell>
          <Trash className="w-4 h-4 text-red-700 dark:text-red-500" />
        </TableCell>
      </TableRow>
    )
  })
}