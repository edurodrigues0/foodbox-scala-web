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
import { useState } from "react";
import { getUnits } from "@/api/get-units";
import { getMenusTodayAndTomorrow } from "@/api/get-menus-today-and-tomorrow";
import { Check, ChevronRight, MapPin, User, UtensilsCrossed } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const createOrderForm = z.object({
  registration: z
    .string()
    .min(1, "Matrícula deve ter pelo menos 1 dígito")
    .max(11, "Matrícula deve ter no máximo 11 dígitos"),
});

type CreateOrderForm = z.infer<typeof createOrderForm>;

export function Home() {
  const [step, setStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  const {
    register,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateOrderForm>();

  const registration = watch("registration");

  const { data: unitsResponse } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: menusResponse, isFetching: isMenusFetching } = useQuery({
    queryKey: ["menus", selectedUnit],
    queryFn: () => getMenusTodayAndTomorrow(selectedUnit),
    enabled: !!selectedUnit,
  });

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  });

  const currentMenu = menusResponse?.menus;

  async function handleConfirm() {
    if (!selectedMenuId || !selectedUnit || !registration) return;

    const unit = unitsResponse?.units_and_restaurants.find(
      (u) => u.unit_id === selectedUnit
    );

    if (!unit || !currentMenu) {
      toast.error("Erro ao confirmar pedido.", {
        position: "top-center",
      });
      return;
    }

    const menu = currentMenu.find((item) => item.menu_id === selectedMenuId)

    try {
      const { name } = await createOrderFn({
        registration: Number(registration),
        orderDate: new Date(menu!.service_date).toISOString(),
        restaurantId: unit.restaurant_id!,
        menuId: menu!.menu_id,
      });

      const firstName = name.split(" ")[0];
      toast.success(`${firstName}, sua marmita foi solicitada com sucesso.`, {
        position: "top-center",
      });
      setModalOpen(false);
      reset();
      setStep(1);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao solicitar marmita.", {
        position: "top-center",
      });
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return selectedUnit !== "";
      case 2:
        return !!selectedMenuId;
      case 3:
        return registration !== "";
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Solicitação de Marmita</h1>

      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[MapPin, UtensilsCrossed, User].map((Icon, idx) => (
            <>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= idx + 1 ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                <Icon size={20} />
              </div>
              {idx < 2 && <div className={`h-1 w-12 ${step > idx + 1 ? "bg-primary" : "bg-muted"}`}></div>}
            </>
          ))}
        </div>
      </div>

      <Card className="max-w-lg h-96 mx-auto flex flex-col justify-between">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Escolha a Unidade"}
            {step === 2 && "Escolha a Marmita"}
            {step === 3 && "Informe sua Matrícula"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Selecione a unidade onde deseja retirar sua marmita"}
            {step === 2 && "Selecione a opção de marmita disponível"}
            {step === 3 && "Digite sua matrícula para finalizar o pedido"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <RadioGroup value={selectedUnit} onValueChange={setSelectedUnit}>
              {unitsResponse?.units_and_restaurants.map((unit) => (
                <div key={unit.unit_id} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={unit.unit_id} id={unit.unit_id} />
                  <Label htmlFor={unit.unit_id}>{unit.unit_name}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {step === 2 && menusResponse && menusResponse.menus && (
            <RadioGroup
              value={selectedMenuId}
              onValueChange={setSelectedMenuId}
              className="space-y-4"
            >
              {menusResponse.menus.map((menu) => (
                <div key={menu.menu_id} className="flex items-start space-x-4 p-4 cursor-pointer border border-muted rounded-lg">
                  <RadioGroupItem
                    value={menu.menu_id}
                    id={`menu-${menu.menu_id}`}
                    className="mt-1"
                  />
                  <Label htmlFor={`menu-${menu.menu_id}`} className="flex flex-col gap-1">
                    <span className="text-base font-semibold">
                      {dayjs(menu.service_date).isSame(dayjs(), 'day') ? 'Marmita de Hoje' : 'Marmita de Amanhã'}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {Array.isArray(menu.menu_description)
                        ? menu.menu_description.join(", ").toUpperCase()
                        : menu.menu_description}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="registration">Matrícula</Label>
              <Input id="registration" {...register("registration")} placeholder="Digite sua matrícula" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setStep((prev) => Math.max(prev - 1, 1))} variant="outline">
            Voltar
          </Button>
          <Button
            onClick={() => {
              if (step < 3) setStep((prev) => prev + 1);
              else setModalOpen(true);
            }}
            disabled={!isStepValid() || isMenusFetching}
          >
            {step < 3 ? "Próximo" : "Solicitar"}
            {step < 3 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pedido</DialogTitle>
            <DialogDescription>Confirme os dados abaixo antes de solicitar sua marmita.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <div className="text-sm">Matrícula: {registration}</div>
            <div className="text-sm">
              Unidade: {
                unitsResponse?.units_and_restaurants.find(u => u.unit_id === selectedUnit)?.unit_name || "-"
              }
            </div>
            <div className="text-sm">
              Marmita: {
                currentMenu?.map(menu => menu.menu_description).join(", ") || "-"
              }
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleConfirm} disabled={isSubmitting}>
              <Check className="mr-2 h-4 w-4" /> Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}