import { getSectors } from "@/api/get-sectors"
import { getUnits } from "@/api/get-units"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { getColaborator } from "@/api/get-colaborator"
import { z } from "zod"
import { updateColaborator } from "@/api/update-colaborator"
import { toast } from "sonner"
import InputMask from "react-input-mask"

const updateColaboratorFormSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  registration: z.coerce.number().optional(),
  sectorId: z.string().cuid2().optional(),
});

type UpdateColaboratorFormSchema = z.infer<typeof updateColaboratorFormSchema>;


export function UpdateColaboratorForm() {
  const navigate = useNavigate()
  const params = useParams<string>()
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UpdateColaboratorFormSchema>();

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: sectorResult, isLoading: isSectorsLoading } = useQuery({
    queryKey: ["sectors", selectedUnit],
    queryFn: () => (selectedUnit ? getSectors(selectedUnit) : Promise.resolve(null)),
    enabled: !!selectedUnit,
  })

  const { data: result } = useQuery({
    queryFn: () => getColaborator(String(params.colaboratorId)),
    queryKey: ['colaborator', String(params.colaboratorId)]
  })

  const { mutateAsync: updateColaboratorFn } = useMutation({
    mutationFn: updateColaborator,
  })

  async function handleUpdateColaborator(data: UpdateColaboratorFormSchema) {
    try {
      await updateColaboratorFn({
        colaboratorId: String(params.colaboratorId),
        body: {
          name: data.name !== "" ? data.name : undefined,
          registration: data.registration ? Number(data.registration) * 1 : undefined,
          sectorId: data.sectorId,
        }
      })

      toast.success("Ação bem sucedida!", {
        position: 'top-center',
        className: 'flex flex-col',
        action: {
          label: "Voltar para lista de colaboradores",
          onClick: () => navigate("/admin/colaboradores"),
        },
      })
    } catch {
      toast.error("Não foi possível editar o colaborador", {
        position: 'top-center'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateColaborator)}
      className="space-y-6 w-96"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          className="border-blue-500"
          id="name"
          {...register("name")}
          defaultValue={result?.colaborator.colaborator_name}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration">Matricula</Label>
        <Input
          className="border-blue-500"
          id="registration"
          type="number"
          {...register("registration")}
          defaultValue={result?.colaborator.colaborator_registration}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration">CPF</Label>
        <InputMask
          mask="999.999.999-99"
          {...register("cpf")}
          defaultValue={result?.colaborator.colaborator_cpf}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="cpf"
              placeholder="000.000.000-00"
              autoComplete="off"
              className="border-blue-500 [&::-webkit-inner-spin-button]:appearance-none"
            />
          )}
        </InputMask>
      </div>

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

      <div className="space-y-2">
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

      <Button className="w-full font-bold" type="submit" disabled={isSubmitting}>
        Editar colaborador
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full font-bold"
        disabled={isSubmitting}
        onClick={() => {navigate('/admin/colaboradores')}}
      >
        Voltar
      </Button>
    </form>
  )
}