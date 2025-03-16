import InputMask from "react-input-mask"

import { z } from "zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const historyForm = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
});

type HistoryForm = z.infer<typeof historyForm>;


export function History() {
    const {
      reset,
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<HistoryForm>({
      defaultValues: {
        cpf: "",
      },
    });

  return (
    <div className="flex flex-1 flex-col gap-24 items-center justify-center">
      <h1 className="text-3xl font-bold tracking-tighter">
        Histórico
      </h1>

      <form className="flex gap-4">
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

        <Button
          type="submit"
        >
          Pesquisar
        </Button>
      </form>

      <div className="leading-10">
        <h2 className="text-xl font-bold">
          Valor gasto no mês: <span className="text-lg font-semibold">R$ 56,90</span>
        </h2>

        <p className="text-lg font-semibold">
          Quantidade de marmitas solicitadas: <span className="font-medium">15</span>
        </p>

        <span className="text-base">Valor atual da marmita: R$ 2,15</span>
      </div>
    </div>
  )
}