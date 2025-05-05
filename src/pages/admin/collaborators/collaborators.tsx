import { getCollaborators } from "@/api/get-collaborators"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { TableHeader, TableHead, TableBody, Table } from "@/components/ui/table"
import { MenuDialog } from "@/pages/restaurant/menu/menu-dialog"
import { MenuTableSkeleton } from "@/pages/restaurant/menu/menu-table-skeleton"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { CollaboratorsTableRow } from "./colaborator-table-row"
import { ColaboratorTableFilter } from "./colaborator-table-filters"

export function Collaborators() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const colaboratorName = searchParams.get('nome')
  const registration = searchParams.get('matricula')
  const unit = searchParams.get('unidade')
  const sector = searchParams.get('setor')

  const { data: result, isLoading: isLoadingCollaborators } = useQuery({
    queryKey: ['collaborators', pageIndex, colaboratorName, registration, unit, sector],
    queryFn: () => getCollaborators({
      pageIndex,
      unit,
      sector,
      registration,
      colaboratorName,
    })
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }

  return (
    <Dialog>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            Colaboradores
          </h1>

          <div className="flex flex-col p-4">
            <Button
              onClick={() => navigate('/admin/colaboradores/cadastro')}
              variant="secondary"
              size="sm"
              className="font-semibold w-fit mb-4"
            >
              <PlusCircle className="w-4 h-4" />
              Adicionar novo colaborador
            </Button>
            <div className="flex flex-1 justify-between">
              <ColaboratorTableFilter />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableHead>Registro</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Editar</TableHead>
              <TableHead>Deletar</TableHead>
            </TableHeader>

            <TableBody>
              {isLoadingCollaborators && <MenuTableSkeleton />}
              {result && result.collaborators.map((colaborator) => {
                return (
                  <CollaboratorsTableRow
                    key={colaborator.colaborator_id}
                    data={colaborator}
                  />
                )
              })}
            </TableBody>
          </Table>

          {result && result.collaborators.length > 0 && (
            <Pagination
              pageIndex={result.meta.page_index}
              perPage={result.meta.per_page}
              totalCount={result.meta.total_count}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>

      <MenuDialog />
    </Dialog>
  )
}