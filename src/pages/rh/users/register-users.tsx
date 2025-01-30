import { getSectors } from "@/api/get-sectors";
import { getUnits } from "@/api/get-units";
import { registerUser, UserRoleEnum } from "@/api/register-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  restaurantName: z.string().optional(),
  sectorId: z.string().optional(),
})

type RegisterUserSchema = z.infer<typeof registerUserSchema>

export function RegisterUsers() {
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>()
  const [role, setRole] = useState<UserRoleEnum | undefined>()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset
  } = useForm<RegisterUserSchema>()

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: sectorResult, isLoading: isSectorsLoading } = useQuery({
    queryKey: ["sectors", selectedUnit],
    queryFn: () => (selectedUnit ? getSectors(selectedUnit) : Promise.resolve(null)),
    enabled: !!selectedUnit,
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser
  })

  async function handleRegisterUser(data: RegisterUserSchema) {
    try {
      await registerUserFn({
        email: data.email,
        name: data.name,
        role: role as unknown as UserRoleEnum ?? undefined,
        restaurantName: data.restaurantName,
        sectorId: data.sectorId,
        unitId: selectedUnit,
      })

      reset()
      setSelectedUnit(undefined)
      setRole(undefined)
      toast.success('Usuário cadastrado com sucesso!', {
        position: 'top-center',
      })
    } catch {
      toast.error("Não foi possível cadastrar o usuário.", {
        position: 'top-center',
      })
    }
  }

  return (
    <form
      className="space-y-4 w-96"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <div className="space-y-2">
        <Label htmlFor="name">
          Nome do Usuários
        </Label>

        <Input
          className="border-blue-500"
          id="name"
          {...register('name')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          E-mail
        </Label>

        <Input
          className="border-blue-500"
          id="email"
          {...register('email')}
        />
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-1 flex-col space-y-2">
          <Label htmlFor="unit">Permissão</Label>
          <Select
            onValueChange={(role) => setRole(role as unknown as UserRoleEnum)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='rh'>RH</SelectItem>
              <SelectItem value='supervisor'>Supervisor</SelectItem>
              <SelectItem value='restaurant'>Restaurante</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 flex-col space-y-2">
          <Label htmlFor="restaurantName">
            Nome do Restaurante
          </Label>

          <Input
            id="restaurantName"
            disabled={ role !== "restaurant" as unknown as UserRoleEnum.restaurant }
            {...register("restaurantName")}
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex flex-1 flex-col space-y-2">
          <Label htmlFor="unit">
            Unidade
          </Label>

          <Select
            disabled={
              role === "rh" as unknown as UserRoleEnum.rh
            }
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

      <Button
        type="submit"
        className="w-full font-bold"
        disabled={isSubmitting}
      >
        Cadastrar Usuário
      </Button>
    </form>
  )
}