import { createRestaurant } from "@/api/create-restaurant";
import { getUnits } from "@/api/get-units";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { X } from "lucide-react";

const registerRestaurantFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  restaurantName: z.string(),
  unitIds: z.array(z.string().cuid2()),
});

type RegisterRestaurantFormSchema = z.infer<typeof registerRestaurantFormSchema>;

export function RestaurantsForm() {
  const queryClient = useQueryClient();
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterRestaurantFormSchema>();

  const { data: unitResult } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { mutateAsync: createRestaurantFn } = useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  function handleRemoveUnit(unitId: string) {
    setSelectedUnitIds(selectedUnitIds.filter((unit) => unit !== unitId))
  }

  function handleSelectedUnit(unitId: string) {
    if (selectedUnitIds.includes(unitId)) return
    setSelectedUnitIds([...selectedUnitIds, unitId])
  }

  async function handleRegisterRestaurant(data: RegisterRestaurantFormSchema) {
    try {
      const response = await createRestaurantFn({
        userName: data.name,
        restaurantName: data.restaurantName,
        userEmail: data.email,
        password: "scala.restaurante@2025",
        unitIds: selectedUnitIds,
      });

      const { restaurant_name } = response;

      toast.success(`O restaurante "${restaurant_name}" foi cadastrado com sucesso!`, {
        position: "top-center",
      });

      setSelectedUnitIds([]);
    } catch (error) {
      toast.error("Não foi possível registrar o restaurante", {
        position: "top-center",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterRestaurant)} className="space-y-4 w-96">
      <div className="space-y-2">
        <Label htmlFor="unit">Unidade</Label>

        <Controller
          name="unitIds"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(selected) => {
                field.onChange(selected)
                handleSelectedUnit(selected)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione unidades" />
              </SelectTrigger>

              <SelectContent>
                {unitResult?.units_and_restaurants.map((unit) => (
                  <SelectItem key={unit.unit_id} value={unit.unit_id}>
                    {unit.unit_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {selectedUnitIds.length > 0 && (
          <div className="mt-2 p-2 rounded-md text-sm">
            <strong>Unidades selecionadas:</strong>
            <ul className="list-disc pl-4 grid grid-cols-4">
              {selectedUnitIds.map((id) => {
                const unit = unitResult?.units_and_restaurants.find(
                  (unit) => unit.unit_id === id
                )
                return (
                  <div className="flex items-center justify-evenly ml-2">
                    <li key={id} className="text-primary-foreground ml-2">
                      {unit?.unit_name}
                    </li>

                    <button
                      type="button"
                      onClick={() => handleRemoveUnit(id)}
                    >
                      <X size={14} className="text-red-500" />
                    </button>
                  </div>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Nome do Gerente */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome do gerente</Label>
        <Input id="name" {...register("name")} />
      </div>

      {/* E-mail */}
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" {...register("email")} />
      </div>

      {/* Nome do Restaurante */}
      <div className="space-y-2">
        <Label htmlFor="restaurantName">Nome do Restaurante</Label>
        <Input id="restaurantName" {...register("restaurantName")} />
      </div>

      {/* Botão de Adicionar */}
      <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
        {isSubmitting ? "Adicionando..." : "Adicionar Restaurante"}
      </Button>
    </form>
  );
}
