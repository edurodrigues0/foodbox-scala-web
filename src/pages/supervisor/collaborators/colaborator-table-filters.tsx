import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const colaboratorFiltersSchema = z.object({
  colaboratorName: z.string().nullable().optional(),
  registration: z.coerce.number().nullable().optional(),
})

type ColaboratorFilterSchema = z.infer<typeof colaboratorFiltersSchema>

export function ColaboratorTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const colaboratorName = searchParams.get('nome')
  const registration = searchParams.get('matricula')

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(colaboratorFiltersSchema),
    defaultValues: {
      colaboratorName: colaboratorName ?? "",
      registration: registration ? Number(registration) : undefined
    }
  })

  function handleFilter({
    registration,
    colaboratorName,
  }: ColaboratorFilterSchema) {
    setSearchParams((prevState) => {
      if (registration) {
        prevState.set('matricula', registration.toString())
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
      prevState.delete('matricula')

      prevState.set('page', '1')

      return prevState
    })

    reset({
      colaboratorName: '',
      registration: undefined,
    })
  }

  return (
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