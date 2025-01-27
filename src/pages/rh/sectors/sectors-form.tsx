import { getUnits } from "@/api/get-units";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SectorsForm() {
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>()

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  })

  return (
    <form className="space-y-4 w-96">
      <div className="space-y-2">
        <Label htmlFor="unit">Unidade</Label>
        <Select
          onValueChange={(unit) => setSelectedUnit(unit)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {unitResult &&
              unitResult.units_and_restaurants.map((unit) => (
                <SelectItem
                  key={unit.unit_id}
                  value={unit.unit_id}
                >
                  {unit.unit_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2 col-span-2">
          <Label>
            Nome do setor
          </Label>

          <Input />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Turma</Label>
          <Select
            onValueChange={(unit) => setSelectedUnit(unit)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">
                1º Turno
              </SelectItem>

              <SelectItem value="2">
                2º Turno
              </SelectItem>

              <SelectItem value="3">
                3º Turno
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full font-bold">
        Adicionar Setor
      </Button>
    </form>
  )
}