/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import { createOrder } from "@/api/create-order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Card } from "@/components/card";
import { UnitsGroup } from "@/components/units-group";
import { useState } from "react";
import { getUnits } from "@/api/get-units";
import { Skeleton } from "@/components/ui/skeleton";
import { getMenusTodayAndTomorrow } from "@/api/get-menus-today-and-tomorrow";
import { MenuDescription } from "@/pages/restaurant/menu/menu-description";
import { UtensilsCrossed, X } from "lucide-react";
import InputMask from "react-input-mask"

const createOrderForm = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
});

type CreateOrderForm = z.infer<typeof createOrderForm>;

interface Menu {
  menu_id: string;
  menu_name: string;
  menu_description: string[];
  service_date: string;
  menu_allergens: string | null;
}

export function Home() {
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [isActiveTodayButton, setIsActiveTodayButton] = useState(false);
  const [isActiveTomorrowButton, setIsActiveTomorrowButton] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateOrderForm>({
    defaultValues: {
      cpf: "",
    },
  });

  const { data: unitsResponse } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: menus, isFetching: isMenusFetching } = useQuery({
    queryKey: ["menus", "today-and-tomorrow", selectedUnit],
    queryFn: () => getMenusTodayAndTomorrow(selectedUnit),
    enabled: !!selectedUnit,
    staleTime: 1000 * 60 * 30, // 30 min
    refetchInterval: 1000 * 60 * 60 * 1, // 1 hour
  });

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  });

  function handleSelectUnit(unitId: string) {
    setSelectedUnit(unitId);
  }

  async function handleCreateOrder(data: CreateOrderForm) {
    if (!menus?.menus || menus.menus.length === 0) {
      return toast.error("Erro ao solicitar marmita.", {
        position: "top-center",
      });
    }

    if (!unitsResponse?.units_and_restaurants || unitsResponse.units_and_restaurants.length === 0) {
      return toast.error("Erro ao solicitar marmita.", {
        position: "top-center",
      });
    }

    const unit = unitsResponse.units_and_restaurants.find(
      (item) => item.unit_id === selectedUnit
    );

    if (!unit) {
      return toast.error("Erro ao encontrar a unidade selecionada.", {
        position: "top-center",
      });
    }

    try {
      const { name } = await createOrderFn({
        cpf: data.cpf,
        orderDate: new Date(currentMenu!.service_date).toISOString(),
        restaurantId: unit.restaurant_id!,
        menuId: currentMenu!.menu_id,
      });

      const firstName = name.split(" ")[0];

      toast.success(`${firstName}, sua marmita foi solicitada com sucesso.`, {
        position: 'top-center',
      })
    } catch (error) {
      console.error(error);
      toast.error("Erro ao solicitar marmita.", {
        position: "top-center",
      });
    } finally {
      reset();
    }
  }

  function handleMenuSelection(menus: Menu[], dayOffset: number) {
    const selectedMenu = menus.find((menu) =>
      dayjs(menu.service_date).isSame(dayjs().add(dayOffset, "day"), "day")
    );

    setCurrentMenu(selectedMenu || null);
    setIsActiveTodayButton(dayOffset === 0);
    setIsActiveTomorrowButton(dayOffset === 1);
  }

  const hasMenus = menus?.menus && menus.menus.length > 0;

  return (
    <div className="flex flex-1 items-center justify-center gap-6 bg-secondary">
      <Card
        title="Cardápio"
        description="Confira o cardápio para hoje e amanhã"
      >
        <p className="mb-1">
          Unidade
        </p>
        <div className="flex items-center justify-center p-2 bg-gray-300 dark:bg-gray-700 rounded-md mb-2">
          {unitsResponse ? (
            <UnitsGroup
              units={unitsResponse.units_and_restaurants}
              onSelectUnit={handleSelectUnit}
            />
          ) : (
            <Skeleton className="h-10 px-3 w-full rounded-md" />
          )}
        </div>

        <div className="flex items-center justify-center p-2 gap-4 bg-gray-300 dark:bg-gray-700 rounded-md">
          <Button
            size="sm"
            disabled={isActiveTodayButton}
            data-active={isActiveTodayButton}
            onClick={() => hasMenus && handleMenuSelection(menus.menus, 0)}
            className="flex flex-1 w-24 text-foreground bg-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:text-primary-foreground disabled:opacity-100 disabled:cursor-not-allowed transition-colors"
          >
            Hoje
          </Button>

          <Button
            size="sm"
            disabled={isActiveTomorrowButton}
            data-active={isActiveTomorrowButton}
            onClick={() => hasMenus && handleMenuSelection(menus.menus, 1)}
            className="flex flex-1 w-24 text-foreground bg-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:text-primary-foreground disabled:opacity-100 disabled:cursor-not-allowed transition-colors"
          >
            Amanhã
          </Button>
        </div>

        {!selectedUnit ? (
          <p className="text-center text-gray-600">
            Selecione uma unidade para visualizar o cardápio.
          </p>
        ) : isMenusFetching ? (
          <Skeleton className="h-80 w-full mt-4" />
        ) : isActiveTodayButton || isActiveTomorrowButton ? (
          currentMenu ? (
            <MenuDescription data={currentMenu} />
          ) : (
            <div className="mt-16 flex flex-col gap-4 items-center justify-center">
              <UtensilsCrossed className="text-gray-600" />
              <p className="text-center text-gray-600">
                Ops, cardápio não disponível.
              </p>
            </div>
          )
        ) : null}
      </Card>

      <Card
        title="Solicitar Marmita"
        description="Faça seu pedido para o dia selecionado"
      >
        <form onSubmit={handleSubmit(handleCreateOrder)} className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="cpf">Seu CPF</Label>
            <InputMask
              mask="999.999.999-99"
              {...register("cpf")}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  id="cpf"
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                />
              )}
            </InputMask>

            <button
              type="button"
              onClick={() => reset()}
              className="absolute right-2 top-[50%]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting || !selectedUnit || isMenusFetching || !hasMenus
            }
          >
            Solicitar Marmita
          </Button>
        </form>
      </Card>
    </div>
  );
}
