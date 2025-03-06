import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function OrdersCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-20 h-5" />
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setor</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                <Skeleton className="h-8 w-[260px]" />
              </TableCell>

              <TableCell className="flex justify-end text-muted-foreground">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                <Skeleton className="h-8 w-[260px]" />
              </TableCell>

              <TableCell className="flex justify-end text-muted-foreground">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                <Skeleton className="h-8 w-[260px]" />
              </TableCell>

              <TableCell className="flex justify-end text-muted-foreground">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                <Skeleton className="h-8 w-[260px]" />
              </TableCell>

              <TableCell className="flex justify-end text-muted-foreground">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                <Skeleton className="h-8 w-[260px]" />
              </TableCell>

              <TableCell className="flex justify-end text-muted-foreground">
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}