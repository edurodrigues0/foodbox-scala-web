import { createColaborator } from "@/api/create-colaborator";
import { getSectors } from "@/api/get-sectors";
import { getUnits } from "@/api/get-units";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";


const createColaboratorFormSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  registration: z.coerce.number(),
  sectorId: z.string().cuid2(),
});

type CreateColaboratorFormSchema = z.infer<typeof createColaboratorFormSchema>;

export function RegisterColaboratorForm() {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CreateColaboratorFormSchema>();

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: sectorResult, isLoading: isSectorsLoading } = useQuery({
    queryKey: ["sectors", selectedUnit],
    queryFn: () => (selectedUnit ? getSectors(selectedUnit) : Promise.resolve(null)),
    enabled: !!selectedUnit,
  })

  const { mutateAsync: createColaboratorFn } = useMutation({
    mutationFn: createColaborator,
  });

  async function handleCreateColaborator(data: CreateColaboratorFormSchema) {
    try {
      const response = await createColaboratorFn({
        name: data.name,
        registration: Number(data.registration),
        cpf: data.cpf,
        sectorId: data.sectorId,
      });

      const { colaborator_name } = response;

      toast.success(
        `Colaborador ${colaborator_name} foi cadastrado com sucesso!`,
        {
          position: "top-center",
          className: 'flex flex-col items-center justify-center gap-4',
          action: {
            label: "Voltar para lista de colaboradores",
            onClick: () => navigate("/rh/dashboard/colaboradores"),
        },
      });
    } catch (error) {
      toast.error("Não foi possível cadastrar o colaborador", {
        position: "top-center",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateColaborator)} className="space-y-6 w-96">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input className="border-blue-500" id="name" {...register("name")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration">Matricula</Label>
        <Input
          className="border-blue-500"
          id="registration"
          type="number"
          {...register("registration")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration">CPF</Label>
        <Input
          id="cpf"
          className="border-blue-500"
          autoComplete="off"
          {...register("cpf")}
        />
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
        Cadastrar colaborador
      </Button>
    </form>
  )
}