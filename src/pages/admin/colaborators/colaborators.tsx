import { getColaborators } from "@/api/get-colaborators"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableHeader, TableHead, TableBody, Table } from "@/components/ui/table"
import { MenuDialog } from "@/pages/app/menu/menu-dialog"
import { MenuTableSkeleton } from "@/pages/app/menu/menu-table-skeleton"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { ColaboratorsTableRow } from "./colaborator-table-row"
import { ColaboratorTableFilter } from "./colaborator-table-filters"

export function Colaborators() {
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

  const { data: result, isLoading: isLoadingColaborators } = useQuery({
    queryKey: ['colaborators', pageIndex, colaboratorName, registration, unit, sector],
    queryFn: () => getColaborators({
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
            <div className="flex flex-1 justify-between">
              <Button
                onClick={() => navigate('/admin/colaboradores/cadastro')}
                variant="link"
                className="font-semibold w-fit"
              >
                <PlusCircle className="w-4 h-4" />
                Adicionar novo colaborador
              </Button>

              <ColaboratorTableFilter />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableHead>Registro</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead></TableHead>
            </TableHeader>

            <TableBody>
              { isLoadingColaborators && <MenuTableSkeleton />}
              { result && result.colaborators.map((colaborator) => {
                return (
                  <ColaboratorsTableRow
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

      <MenuDialog />
    </Dialog>
  )
}