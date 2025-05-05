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
import { Check, ChevronRight, MapPin, User, UtensilsCrossed, X } from "lucide-react";
import { ConfirmOrderDialog } from "./confirm-order.dialog";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const createOrderForm = z.object({
  registration: z
    .number()
    .min(1, "Matrícula deve ter pelo menos 1 dígito")
    .max(11, "Matrícula deve ter no máximo 11 dígitos")
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
  const [isConfirmDialog, setIsConfirmDialog] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateOrderForm>()

  const registration = watch("registration")

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
        registration: data.registration,
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
      setIsConfirmDialog(false)
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

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    unidade: "",
    marmita: "",
    matricula: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [colaborador, setColaborador] = useState({
    nome: "",
    setor: "",
    cargo: "",
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Simulando busca de dados do colaborador
      // Em um cenário real, isso seria uma chamada de API
      setColaborador({
        nome: "João Silva",
        setor: "Produção",
        cargo: "Operador",
      })
      setModalOpen(true)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleConfirm = () => {
    // Aqui você implementaria a lógica para salvar a solicitação
    alert("Marmita solicitada com sucesso!")
    setModalOpen(false)
    // Reset do formulário
    setFormData({
      unidade: "",
      marmita: "",
      matricula: "",
    })
    setStep(1)
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.unidade !== ""
      case 2:
        return formData.marmita !== ""
      case 3:
        return formData.matricula !== ""
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Solicitação de Marmita</h1>

      {/* Stepper */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <MapPin size={20} />
          </div>
          <div className={`h-1 w-12 ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <UtensilsCrossed size={20} />
          </div>
          <div className={`h-1 w-12 ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
          >
            <User size={20} />
          </div>
        </div>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Escolha a Unidade"}
            {step === 2 && "Escolha a Marmita"}
            {step === 3 && "Informe sua Matrícula"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Selecione a unidade onde deseja retirar sua marmita"}
            {step === 2 && "Selecione a opção de marmita disponível hoje"}
            {step === 3 && "Digite sua matrícula para finalizar o pedido"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <RadioGroup value={formData.unidade} onValueChange={(value) => handleChange("unidade", value)}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="unidade1" id="unidade1" />
                <Label htmlFor="unidade1">Unidade Central</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="unidade2" id="unidade2" />
                <Label htmlFor="unidade2">Unidade Norte</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unidade3" id="unidade3" />
                <Label htmlFor="unidade3">Unidade Sul</Label>
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup value={formData.marmita} onValueChange={(value) => handleChange("marmita", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="marmita1" id="marmita1" />
                <Label htmlFor="marmita1" className="flex-1">
                  <div className="font-medium">Marmita do Dia</div>
                  <div className="text-sm text-muted-foreground">Arroz, feijão, bife acebolado, salada e legumes</div>
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  placeholder="Digite sua matrícula"
                  value={formData.matricula}
                  onChange={(e) => handleChange("matricula", e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
            Voltar
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid()}>
            {step < 3 ? "Próximo" : "Solicitar"}
            {step < 3 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>

      {/* Modal de confirmação */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Solicitação</DialogTitle>
            <DialogDescription>Verifique os dados abaixo e confirme sua solicitação de marmita</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Dados do Colaborador</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Nome:</div>
                <div>{colaborador.nome}</div>
                <div className="text-muted-foreground">Matrícula:</div>
                <div>{formData.matricula}</div>
                <div className="text-muted-foreground">Setor:</div>
                <div>{colaborador.setor}</div>
                <div className="text-muted-foreground">Cargo:</div>
                <div>{colaborador.cargo}</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Detalhes do Pedido</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Unidade:</div>
                <div>
                  {formData.unidade === "unidade1" && "Unidade Central"}
                  {formData.unidade === "unidade2" && "Unidade Norte"}
                  {formData.unidade === "unidade3" && "Unidade Sul"}
                </div>
                <div className="text-muted-foreground">Marmita:</div>
                <div>Marmita do Dia</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>
              <Check className="mr-2 h-4 w-4" /> Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    // <div className="flex flex-1 items-center justify-center gap-6 bg-secondary">
    //   <Card
    //     title="Cardápio"
    //     description="Confira o cardápio para hoje e amanhã"
    //   >
    //     <p className="mb-1">
    //       Unidade
    //     </p>
    //     <div className="flex items-center justify-center p-2 bg-gray-300 dark:bg-gray-700 rounded-md mb-2">
    //       {unitsResponse ? (
    //         <UnitsGroup
    //           units={unitsResponse.units_and_restaurants}
    //           onSelectUnit={handleSelectUnit}
    //         />
    //       ) : (
    //         <Skeleton className="h-10 px-3 w-full rounded-md" />
    //       )}
    //     </div>

    //     <div className="flex items-center justify-center p-2 gap-4 bg-gray-300 dark:bg-gray-700 rounded-md">
    //       <Button
    //         size="sm"
    //         disabled={isActiveTodayButton}
    //         data-active={isActiveTodayButton}
    //         onClick={() => hasMenus && handleMenuSelection(menus.menus, 0)}
    //         className="flex flex-1 w-24 text-foreground bg-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:text-primary-foreground disabled:opacity-100 disabled:cursor-not-allowed transition-colors"
    //       >
    //         Hoje
    //       </Button>

    //       <Button
    //         size="sm"
    //         disabled={isActiveTomorrowButton}
    //         data-active={isActiveTomorrowButton}
    //         onClick={() => hasMenus && handleMenuSelection(menus.menus, 1)}
    //         className="flex flex-1 w-24 text-foreground bg-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground hover:text-primary-foreground disabled:opacity-100 disabled:cursor-not-allowed transition-colors"
    //       >
    //         Amanhã
    //       </Button>
    //     </div>

    //     {!selectedUnit ? (
    //       <p className="text-center text-gray-600">
    //         Selecione uma unidade para visualizar o cardápio.
    //       </p>
    //     ) : isMenusFetching ? (
    //       <Skeleton className="h-80 w-full mt-4" />
    //     ) : isActiveTodayButton || isActiveTomorrowButton ? (
    //       currentMenu ? (
    //         <MenuDescription data={currentMenu} />
    //       ) : (
    //         <div className="mt-16 flex flex-col gap-4 items-center justify-center">
    //           <UtensilsCrossed className="text-gray-600" />
    //           <p className="text-center text-gray-600">
    //             Ops, cardápio não disponível.
    //           </p>
    //         </div>
    //       )
    //     ) : null}
    //   </Card>

    //   <Card
    //     title="Solicitar Marmita"
    //     description="Faça seu pedido para o dia selecionado"
    //   >
    //     <form onSubmit={handleSubmit(handleCreateOrder)} className="space-y-4">
    //       <div className="space-y-2 relative">
    //         <Label htmlFor="registration">Matrícula</Label>
    //         <Input
    //           id="registration"
    //           placeholder="Sua matrícula"
    //           autoComplete="off"
    //           {...register("registration", { valueAsNumber: true })} // Captura corretamente a matrícula
    //           className="[&::-webkit-inner-spin-button]:appearance-none"
    //         />

    //         <button
    //           type="button"
    //           onClick={() => reset()}
    //           className="absolute right-2 top-[50%]"
    //         >
    //           <X className="w-4 h-4" />
    //         </button>
    //       </div>

    //       <ConfirmOrderDialog
    //         setIsOpen={setIsConfirmDialog}
    //         isOpen={isConfirmDialog}
    //         registration={registration}
    //         onConfirm={() => handleSubmit(handleCreateOrder)()}
    //       >
    //         <Button
    //           className="w-full"
    //           disabled={
    //             isSubmitting || !selectedUnit || isMenusFetching || !hasMenus
    //           }
    //         >
    //           Solicitar Marmita
    //         </Button>
    //       </ConfirmOrderDialog>
    //     </form>
    //   </Card>
    // </div>
  );
}
