import { getUnits } from "@/api/get-units";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createSector } from "@/api/create-sector";

const createSectorFormSchema = z.object({
  name: z.string(),
  unitId: z.string().cuid2(),
})

type CreateSectorFormSchema = z.infer<typeof createSectorFormSchema>

export function SectorsForm() {
  const queryClient = useQueryClient()
  const [selectedUnit, setSelectedUnit] = useState<string>('')
  const [period, setPeriod] = useState<string | undefined>()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateSectorFormSchema>()

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  })

  const { mutateAsync: createSectorFn } = useMutation({
    mutationFn: createSector,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-sectors']})
    }
  })

  async function handleCreateSector(data: CreateSectorFormSchema) {
    if (data.name === '') {
      return toast.message('Informe o nome do setor', {
        position: 'top-center',
      })
    }
    
    let workPeriod = ' (manhã)'

    if (Number(period) <= 0 || Number(period) >= 4) {
      return toast.error('Erro ao cadastrar setor', {
        position: 'top-center'
      })
    }
    
    if (Number(period) === 2) {
      workPeriod = ' (tarde)'
    }

    if (Number(period) === 3) {
      workPeriod = ' (noite)'
    }

    try {
      const response = await createSectorFn({
        name: (data.name + workPeriod).toLowerCase(),
        unitId: selectedUnit,
      })

      toast.success(`Setor ${response.sector_name} criado com sucesso!`, {
        position: 'top-center',
      })

      reset()
      setPeriod(undefined)
    } catch {
      toast.error('Erro ao cadastrar o setor', {
        position: 'top-center'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateSector)}
      className="flex flex-col max-w-sm w-full gap-4"
    >
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
          <Label htmlFor="name">
            Nome do setor
          </Label>

          <Input
            id="name"
            type="text"
            disabled={!selectedUnit}
            {...register("name")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="period">Turma</Label>
          <Select
            disabled={!selectedUnit}
            onValueChange={(period) => setPeriod(period)}
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

      <Button
        type="submit"
        className="w-full font-bold"
        disabled={isSubmitting}
      >
        Adicionar Setor
      </Button>
    </form>
  )
}