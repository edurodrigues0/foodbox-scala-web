import { Pagination } from "@/components/pagination"
import { TableHeader, TableHead, TableBody, Table } from "@/components/ui/table"
import { MenuTableSkeleton } from "@/pages/restaurant/menu/menu-table-skeleton"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"
import { CollaboratorsTableRow } from "./colaborator-table-row"
import { getCollaboratorsBySector } from "@/api/get-collaborators-by-sector"
import { ColaboratorTableFilter } from "./colaborator-table-filters"

export function Collaborators() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const colaboratorName = searchParams.get('nome')
  const registration = searchParams.get('matricula')
  const sector = searchParams.get('setor')

  const { data: result, isLoading: isLoadingCollaborators } = useQuery({
    queryKey: ['collaborators-by-sector', pageIndex, colaboratorName, registration, sector],
    queryFn: () => getCollaboratorsBySector({
      pageIndex,
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
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Colaboradores
        </h1>

        <div className="flex flex-col p-4">
          <ColaboratorTableFilter />
        </div>

        <Table>
          <TableHeader>
            <TableHead>Registro</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Setor</TableHead>
          </TableHeader>

          <TableBody>
            { isLoadingCollaborators && <MenuTableSkeleton />}
            { result && result.collaborators.map((colaborator) => {
              return (
                <CollaboratorsTableRow
                  key={colaborator.colaborator_id}
                  data={colaborator}
                />
              )
            })}
          </TableBody>
        </Table>

        { result && (
          <Pagination
            pageIndex={result.meta.page_index}
            perPage={result.meta.per_page}
            totalCount={result.meta.total_count}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </div>
  )
}