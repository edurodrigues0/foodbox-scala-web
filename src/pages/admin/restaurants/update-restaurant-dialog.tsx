import { getRestaurant } from "@/api/get-restaurant";
import { getUnits } from "@/api/get-units";
import { updateRestaurant } from "@/api/update-restaurant";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateRestaurantFormSchema = z.object({
  name: z.string().optional(),
  unitId: z.string().cuid2().optional(),
  managerName: z.string().optional(),
  managerEmail: z.string().email().optional(),
})

type UpdateRestaurantFormSchema = z.infer<typeof updateRestaurantFormSchema>

interface UpdateRestaurantDialogProps {
  open: boolean
  restaurantId: string
}

export function UpdateRestaurantDialog({
  open,
  restaurantId,
}: UpdateRestaurantDialogProps) {
  const queryClient = useQueryClient()

  const {
    reset,
    register,
    control,
    handleSubmit,
    // formState: { isSubmitting },
  } = useForm<UpdateRestaurantFormSchema>()

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  })

  const { data: result } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: async () => await getRestaurant(restaurantId),
    enabled: open && !!restaurantId,
  })

  const { mutateAsync: updateRestaurantFn } = useMutation({
    mutationFn: updateRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] })
    },
    onError: () => {
      toast.error('Falha ao atualizar o restaurante.', {
        position: 'top-center',
      })
    }
  })

  async function handleUpdateRestaurant(data: UpdateRestaurantFormSchema) {
    await updateRestaurantFn({
      restaurantId,
      body: data,
    })

    toast.success('Restaurante foi atualizado com sucesso!', {
      position: 'top-center',
    })

    reset()
  }

  useEffect(() => {
    if (result && result.restaurant) {
      const { name, manager } = result.restaurant

      reset({
        name: name ?? "",
        managerEmail: manager.email ?? "",
        managerName: manager.name ?? "",
      })
    }
  }, [result, reset])

  return (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>Edite o restaurante</DialogTitle>

        <DialogDescription>
          Edite as informações do restaurante.
        </DialogDescription>
      </DialogHeader>
      
      { result ? (
        <form onSubmit={handleSubmit(handleUpdateRestaurant)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="name"
              >
                Nome do restaurante
              </Label>

              <Input
                id="name"
                className="col-span-3"
                {...register('name')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-xs" htmlFor="unit">
                Unidade
              </Label>

              <Controller
                name="unitId"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="col-span-3">
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
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="managerName"
              >
                Nome do Gerente
              </Label>

              <Input
                id="managerName"
                className="col-span-3"
                disabled
                {...register("managerName")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="managerEmail"
              >
                E-mail do gerente
              </Label>

              <Input
                id="managerEmail"
                className="col-span-3"
                disabled
                {...register("managerEmail")}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="ghost"
                type="button"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              variant="success"
              type="submit"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <h1>Carregando...</h1>
      )}
    </DialogContent>
  )
}