import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { RestaurantsForm } from "./restaurants-form";

export function Restaurants() {
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
                <TableHead>Unidade</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead></TableHead>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    Scala I
                  </TableCell>

                  <TableCell>
                    Recanto da Praça
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Scala II
                  </TableCell>

                  <TableCell>
                    Recanto da Praça
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Scala III
                  </TableCell>

                  <TableCell>
                    Raízes Gastrobar
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Scala IV
                  </TableCell>

                  <TableCell>
                    Kavera's Restaurante
                  </TableCell>

                  <TableCell>
                    <Edit2 />
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell>
                    SCL
                  </TableCell>

                  <TableCell>
                    Restaurante Armazém
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