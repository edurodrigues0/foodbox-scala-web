import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RegisterSupervisors } from "./register-supervisors";
import { Edit2 } from "lucide-react";

export function Supervisors() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Gerencimaneto de Supervisores
        </h1>

        <div className="flex flex-col p-4">
          <RegisterSupervisors />

          <div className="flex flex-1 flex-col gap-4 mt-10">
            <h2 className="font-semibold text-xl">
              Supervisores Cadastrados
            </h2>

            <Table>
              <TableHeader>
                <TableHead>Nome</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead></TableHead>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    Eduardo Rodrigues
                  </TableCell>

                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Maturação(1º Turno)
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Eduardo Rodrigues
                  </TableCell>

                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Maturação(1º Turno)
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
    </div>
  )
}