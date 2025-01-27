import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function SectorsTableFilters() {
  return (
    <form
      className="flex items-center gap-2"
      // onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Unidade"
        className="h-8 w-28"
        // {...register('unit')}
      />

      <Input
        placeholder="Setor"
        className="h-8 w-52"
        // {...register('sector')}
      />

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