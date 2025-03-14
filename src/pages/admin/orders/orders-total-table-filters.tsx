import { DateRangePicker } from "@/components/data-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subDays } from "date-fns";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function OrdersTotalTableFilters() {
  const [dataRange, _setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  return (
    <form
      className="flex items-center gap-2"
      // onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        type="number"
        placeholder="Matricula"
        className="h-8 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        // {...register('registration')}
      />

      <Input
        placeholder="Nome do colaborador"
        className="h-8 w-52"
        // {...register('colaboratorName')}
      />

      <Input
        placeholder="Unidade"
        className="h-8 w-28"
        // {...register('unit')}
      />

      <DateRangePicker date={dataRange} onDateChange={() => {}} />

      <Button type="submit" variant="secondary" size="sm">
        <Search className="h-4 w-4 mr-2" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        // onClick={handleClearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Remover filtro
      </Button>
    </form>
  )
}