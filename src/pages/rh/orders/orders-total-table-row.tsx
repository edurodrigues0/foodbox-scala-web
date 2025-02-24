import { TableCell, TableRow } from "@/components/ui/table";

interface OrdersTotalTableRowProps {
  data: {
    registration: number
    colaborator: string
    cpf: string
    total_spent_in_cents: number
    total_orders: number
  }
}

export function OrdersTotalTableRow({
  data,
}: OrdersTotalTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        { data.registration }
      </TableCell>

      <TableCell>
        { data.colaborator }
      </TableCell>

      <TableCell>
        { data.cpf }
      </TableCell>

      <TableCell>
        { data.total_orders }
      </TableCell>

      <TableCell>
        {
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(data.total_spent_in_cents / 100)
        }
      </TableCell>
    </TableRow>
  )
}