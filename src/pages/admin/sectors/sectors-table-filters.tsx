import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const sectorFiltersSchema = z.object({
  unit: z.string().optional(),
  sector: z.string().optional(),
})

type SectorFilterSchema = z.infer<typeof sectorFiltersSchema>

export function SectorsTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const unit = searchParams.get('unidade')
  const sector = searchParams.get('setor')

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(sectorFiltersSchema),
    defaultValues: {
      unit: unit ?? "",
      sector: sector ?? "",
    }
  })

  function handleFilter({
    unit,
    sector,
  }: SectorFilterSchema) {
    setSearchParams((prevState) => {
      if(unit) {
        prevState.set('unidade', unit)
      } else {
        prevState.delete('unidade')
      }

      if (sector) {
        prevState.set('setor', sector)
      } else {
        prevState.delete('setor')
      }

      prevState.set('page', '1')
      return prevState
    })
  }

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('setor')
      prevState.delete('unidade')
      prevState.set('page', '1')

      return prevState
    })

    reset({
      unit: '',
      sector: '',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Unidade"
        className="h-8 w-28"
        {...register('unit')}
      />

      <Input
        placeholder="Setor"
        className="h-8 w-52"
        {...register('sector')}
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
  )
}