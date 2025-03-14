import { useQuery } from "@tanstack/react-query";
import { RegisterUnitForm } from "./register-unit-form";
import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table"
import { getUnits } from "@/api/get-units";
import { UnitsTableRow } from "./units-table-row";

export function Units() {
  const { data: result, isLoading: _isUnitLoading } = useQuery({
    queryFn: getUnits,
    queryKey: ['units']
  })
  
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
              { result && result.units_and_restaurants.map((unit) => {
                return (
                  <UnitsTableRow
                    key={unit.unit_id}
                    data={unit}
                  />
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}