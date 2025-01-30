import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { RegisterUsers } from "./register-users";
import { Pagination } from "@/components/pagination";
import { UsersTableRow } from "./users-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/api/get-users";
import { deleteUser } from "@/api/delete-user";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";

export function Users() {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    data: result,
    isLoading: isUsersLoading
  } = useQuery({
    queryFn: getUsers,
    queryKey: ['users']
  })

    const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const {
    mutateAsync: deleteUserFn,
    isPending: isDeleteUser
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', pageIndex] })
    },
  })

  async function handleDeleteUser(userId: string) {
    try {
      await deleteUserFn(userId);
      toast.success("O usuário foi deletado com sucesso!", { position: "top-center" });
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Você não tem permissão para deletar este usuário!", { position: "top-center" });
      } else if (error.response?.status === 404) {
        toast.error("Usuário não encontrado!", { position: "top-center" });
      } else {
        toast.error("Não foi possível deletar este usuário!", { position: "top-center" });
      }
    }
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-2">
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
                      onDeleteUser={handleDeleteUser}
                      isDeleteUserLoading={isDeleteUser}
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