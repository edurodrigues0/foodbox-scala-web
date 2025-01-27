import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectorsForm } from "./sectors-form";
import { Edit2 } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { SectorsTableFilters } from "./sectors-table-filters";

export function Sectors() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Setores
        </h1>

        <div className="flex flex-col flex-1 p-4">
          <SectorsForm />

          <div className="flex flex-1 flex-col gap-4 mt-10">
            <h2 className="font-semibold text-xl">
              Setores Cadastrados
            </h2>

            <SectorsTableFilters />
            
            <Table>
              <TableHeader>
                <TableHead>Unidade</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead></TableHead>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Parmesão
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Requeijão
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Colonial
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    SCL
                  </TableCell>

                  <TableCell>
                    Teste
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell>
                    SCL
                  </TableCell>

                  <TableCell>
                    Teste 2
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Pagination
              pageIndex={0}
              perPage={10}
              totalCount={99}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}