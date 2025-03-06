import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { SectorsForm } from "./sectors-form";
import { Pagination } from "@/components/pagination";
import { SectorsTableFilters } from "./sectors-table-filters";
import { useQuery } from "@tanstack/react-query";
import { getAllSectors } from "@/api/get-all-sectors";
import { SectorsTableRow } from "./sectors-table-row";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";

export function Sectors() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
  .number()
  .transform((page) => page - 1)
  .parse(searchParams.get('page') ?? '1')
  const unit = searchParams.get('unidade')
  const sector = searchParams.get('setor')

  const { data: result, isLoading: isUnitLoading } = useQuery({
    queryFn: () => getAllSectors({
      pageIndex,
      unit,
      sector,
    }),
    queryKey: ['all-sectors', pageIndex, unit, sector]
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }


  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4 p-4">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Setores
        </h1>

        <div className="flex flex-1 flex-col gap-4 mt-4 md:mt-10">
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
                {result && result.sectors.map((sector) => {
                  return (
                    <SectorsTableRow key={sector.id} data={sector} />
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
      </div>
    </div>
  )
}
