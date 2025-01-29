import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { RegisterUsers } from "./register-users";
import { Pagination } from "@/components/pagination";
import { UsersTableRow } from "./users-table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/get-users";

export function Users() {
  const {
    data: result,
    isLoading: isUsersLoading
  } = useQuery({
    queryFn: getUsers,
    queryKey: ['users']
  })

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
                { result && result.users.map((user) => {
                  return (
                    <UsersTableRow
                      key={user.id}
                      data={user}
                    />
                  )
                })}
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