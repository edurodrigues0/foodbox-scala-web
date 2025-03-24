import { DateRangePicker } from "@/components/data-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { z } from "zod";

const ordersTotalFilterSchema = z.object({
  colaboratorName: z.string().optional(),
  registration: z.coerce.number().optional(),
  unit: z.string().optional(),
  cpf: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
})

type OrdersTotalFilterSchema = z.infer<typeof ordersTotalFilterSchema>

interface OrdersTotalTableFiltersProps {
  dateRange: DateRange | undefined
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function OrdersTotalTableFilters({
  dateRange,
  setDateRange
}: OrdersTotalTableFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const cpf = searchParams.get('cpf')
  const unit = searchParams.get('unidade')
  const colaboratorName = searchParams.get('nome')
  const registration = searchParams.get('matricula')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(ordersTotalFilterSchema),
    defaultValues: {
      cpf: cpf ?? "",
      to: to ?? "",
      unit: unit ?? "",
      from: from ?? "",
      registration: Number(registration) ?? undefined,
      colaboratorName: colaboratorName ?? "",
    }
  })

  function handleFilter({
    cpf,
    unit,
    registration,
    colaboratorName
  }: OrdersTotalFilterSchema) {
    setSearchParams((prevState) => {
      if(cpf) {
        prevState.set('cpf', cpf)
      } else {
        prevState.delete('cpf')
      }

      if (unit) {
        prevState.set('unidade', unit)
      } else {
        prevState.delete('unit')
      }

      if (registration) {
        prevState.set('matricula', registration ? registration.toString() : '')
      } else {
        prevState.delete('matricula')
      }

      if (colaboratorName) {
        prevState.set('nome', colaboratorName)
      } else {
        prevState.delete('nome')
      }

      prevState.set('page', '1')
      return prevState
    })
  }

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('nome')
      prevState.delete('unidade')
      prevState.delete('matricula')
      prevState.delete('cpf')
      prevState.delete('registration')

      prevState.set('page', '1')
      return prevState
    })

    reset({
      to: "",
      from: "",
      cpf: "",
      unit: "",
      registration: undefined,
      colaboratorName: "",
    })
  }

  return (
    <div>
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold">Filtros</span>

        <Input
          type="number"
          placeholder="Matricula"
          className="h-8 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...register('registration')}
        />

        <Input
          placeholder="Nome do colaborador"
          className="h-8 w-52"
          {...register('colaboratorName')}
        />

        <Input
          placeholder="Unidade"
          className="h-8 w-28"
          {...register('unit')}
        />

        <Button type="submit" variant="secondary" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Filtrar resultados
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Remover filtro
        </Button>
      </form>
      <div className="flex items-center gap-2 mt-4">
        <span>Periodo</span>
        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </div>
    </div>
  )
}