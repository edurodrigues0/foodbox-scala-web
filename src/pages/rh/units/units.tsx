import { RegisterUnitForm } from "./register-unit-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";

export function Units() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Cadastro de Unidades
        </h1>

        <div className="flex flex-col">
          <RegisterUnitForm />
        </div>

        <div className="flex flex-1 flex-col gap-4 mt-10">
          <h2 className="font-semibold text-xl">
            Unidades Cadastrados
          </h2>

          <Table>
            <TableHeader>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead></TableHead>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  1
                </TableCell>

                <TableCell>
                  Scala I
                </TableCell>

                <TableCell>
                  <Edit2 />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  2
                </TableCell>

                <TableCell>
                  Scala II
                </TableCell>

                <TableCell>
                  <Edit2 />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  3
                </TableCell>

                <TableCell>
                  Scala III
                </TableCell>

                <TableCell>
                  <Edit2 />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  4
                </TableCell>

                <TableCell>
                  Scala IV
                </TableCell>

                <TableCell>
                  <Edit2 />
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell>
                  99
                </TableCell>

                <TableCell>
                  SCL
                </TableCell>

                <TableCell>
                  <Edit2 />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}