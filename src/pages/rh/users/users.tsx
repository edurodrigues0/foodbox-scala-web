import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { RegisterUsers } from "./register-users";
import { Pagination } from "@/components/pagination";

export function Users() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Gerenciamento de Usuário
        </h1>

        <div className="flex flex-col p-4">
          <RegisterUsers />

          <div className="flex flex-1 flex-col gap-4 mt-10">
            <h2 className="font-semibold text-xl">
              Usuários Cadastrados
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

            <Pagination
              onPageChange={() => {}}
              pageIndex={0}
              perPage={10}
              totalCount={30}
            />
          </div>
        </div>
      </div>
    </div>
  )
}