import { getSectors } from "@/api/get-sectors";
import { getUnits } from "@/api/get-units";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function RegisterSupervisors() {
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm();

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: sectorResult, isLoading: isSectorsLoading } = useQuery({
    queryKey: ["sectors", selectedUnit],
    queryFn: () => (selectedUnit ? getSectors(selectedUnit) : Promise.resolve(null)),
    enabled: !!selectedUnit,
  })

  return (
    <form className="space-y-4 w-96">
      <div className="space-y-2">
        <Label htmlFor="registration">
          Nome do Supervisor
        </Label>

        <Input
          className="border-blue-500"
          id="registration"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration">
          E-mail
        </Label>

        <Input
          className="border-blue-500"
          id="registration"
        />
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-1 flex-col space-y-2">
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

        <div className="flex flex-1 flex-col space-y-2">
          <Label htmlFor="unit">Setor</Label>

          <Controller
            name="sectorId"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled || isSectorsLoading || !sectorResult}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sectorResult?.sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <Button className="w-full font-bold">
        Cadastrar Supervisor
      </Button>
    </form>
  )
}