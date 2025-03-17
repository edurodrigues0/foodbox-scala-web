import InputMask from "react-input-mask"

import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getOrdersForCurrentBillingCycle } from "@/api/get-orders-for-current-billing-cycle";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const historyForm = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
});

type HistoryForm = z.infer<typeof historyForm>;

export function History() {
  const [cpf, setCpf] = useState("")

  const {
    handleSubmit,
  } = useForm<HistoryForm>({
    defaultValues: {
      cpf: "",
    },
  })

  const {
    data: result,
    mutateAsync: getCurrentOrders,
    isPending,
  } = useMutation({
    mutationFn: getOrdersForCurrentBillingCycle,
    mutationKey: ["orders-for-current-billing-cycle"]
  })

  async function handleGetOrdersForCurrentBillingCycle() {
    try {
      await getCurrentOrders(cpf)
      setCpf("")
    } catch (error) {
      toast.error('Falha ao obter histórico!', {
        position: 'top-center',
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-24 items-center justify-center">
      <h1 className="text-3xl font-bold tracking-tighter">
        Histórico
      </h1>

      <form className="flex gap-4" onSubmit={handleSubmit(handleGetOrdersForCurrentBillingCycle)}>
        <InputMask
          mask="999.999.999-99"
          onChange={(e) => setCpf(e.target.value)}
          value={cpf}
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

        <Button
          type="submit"
        >
          Pesquisar
        </Button>
      </form>

      <div className="leading-10">
        <h2 className="text-xl font-bold">
          Valor gasto no mês: 
          <span className="text-lg font-semibold ml-2">
            {isPending ? (
              <span className="animate-spin inline-flex">
                <Loader2Icon size={16} />
              </span>
            ) : result ? (
              <span>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(result.spent_in_cents / 100)
                }
              </span>
            ) : (
              'R$ 0,00'
            )}
          </span>
        </h2>

        <p className="text-lg font-semibold">
          Quantidade de marmitas solicitadas:
          <span className="font-medium ml-2">
            { isPending ? (
                <span className="animate-spin inline-flex">
                  <Loader2Icon size={16} />
                </span>
              ) : result ? (
                <span>{ result.total }</span>
              ) : (
                0
            )}
          </span>
        </p>

        <span className="text-base">Valor atual da marmita: R$ 2,15</span>
      </div>

      <Button className="w-96" asChild>
        <Link to="/">
            Voltar
        </Link>
      </Button>
    </div>
  )
}