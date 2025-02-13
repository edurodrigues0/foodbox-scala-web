import { Table, TableBody, TableHead, TableHeader } from "@/components/ui/table";
import { RestaurantsForm } from "./restaurants-form";
import { RestaurantsTableRow } from "./restaurants-table-row";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "@/api/get-restaurants";

export function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = z.coerce
  .number()
  .transform((page) => page - 1)
  .parse(searchParams.get('page') ?? '1')

  const {
    data: result,
    isLoading: isRestaurantsLoading
  } = useQuery({
    queryFn: () => getRestaurants({
      pageIndex,
    }),
    queryKey: ['restaurants', pageIndex],
  })

  console.log(result)

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Restaurantes
        </h1>

        <div className="flex flex-col flex-1 p-4">
          <RestaurantsForm />

          <div className="flex flex-1 flex-col gap-4 mt-10">
            <h2 className="font-semibold text-xl">
              Restaurantes Cadastrados
            </h2>
            
            <Table>
              <TableHeader>
                <TableHead>Unidade(s)</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Gerente</TableHead>
                <TableHead></TableHead>
              </TableHeader>

              <TableBody>
                { result && result.restaurants.map((restaurant) => {
                  return (
                    <RestaurantsTableRow
                      key={restaurant.id}
                      data={restaurant}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}