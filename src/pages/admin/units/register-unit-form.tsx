import { createUnit } from "@/api/create-unit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const createUnitFormSchema = z.object({
  name: z.string(),
  unit: z.number(),
})

type CreateUnitFormSchema = z.infer<typeof createUnitFormSchema>

export function RegisterUnitForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<CreateUnitFormSchema>()

  const { mutateAsync: createUnitFn } = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units']})
    }
  })

  async function handleCreateUnit(data: CreateUnitFormSchema) {
    try {
      const response = await createUnitFn({
        name: data.name,
        unit: data.unit,
      })

      const { unity_name } = response

      toast.success(`${unity_name} foi cadastrada com sucesso!`,{
        position: 'top-center'
      })

      reset()
    } catch (error) {
      toast.error('Não foi possível cadastrar o colaborador', {
        position: 'top-center'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateUnit)}
      className="space-y-4 w-96"
    >
      <div className="space-y-4">
        <Label htmlFor="unit">Código</Label>
        <Input
          id="unit"
          type="number"
          min={1}
          max={99}
          {...register('unit')}
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="name">Nome da Unidade</Label>
        <Input
          id="unit"
          {...register('name')}
        />
      </div>

      <Button
        type='submit'
        className="w-full font-bold"
        disabled={isSubmitting}
      >
        Adicionar Unidade
      </Button>
    </form>
  )
}