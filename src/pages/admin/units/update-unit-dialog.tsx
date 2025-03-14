import { getUnit } from "@/api/get-unit";
import { updateUnit } from "@/api/update-unit";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateUnitFormSchema = z.object({
  name: z.string().optional(),
  unit: z.number().optional(),
})

type UpdateUnitFormSchema = z.infer<typeof updateUnitFormSchema>

interface UpdateUnitDialogProps {
  open: boolean
  unitId: string
}

export function UpdateUnitDialog({
  open,
  unitId,
}: UpdateUnitDialogProps) {
  const queryClient = useQueryClient()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUnitFormSchema>()

  const { data: result } = useQuery({
    queryKey: ["unit", unitId],
    queryFn: async () => await getUnit(unitId),
    enabled: open && !!unitId,
  })

  const {
    mutateAsync: updateUnitFn,
    isPending: _isUpdateUnit
  } = useMutation({
    mutationFn: updateUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
    onError: () => {
      toast.error('Falha ao atualizar unidade.', {
        position: 'top-center'
      })
    }
  })

  async function handleUpdateUnit(data: UpdateUnitFormSchema) {
    await updateUnitFn({
      unitId,
      body: data,
    })

    toast.success('Unidade foi editada com sucesso!', {
      position: 'top-center'
    })
  }

  useEffect(() => {
    if (result && result.unit) {
      const { name, unity } = result.unit

      reset({
        name: name ?? "",
        unit: unity ?? 0,
      })
    }
  }, [result, reset])

  return (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>Edite a unidade</DialogTitle>

        <DialogDescription>
          Edite as informações da unidade.
        </DialogDescription>
      </DialogHeader>


      { result ? (
        <form onSubmit={handleSubmit(handleUpdateUnit)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="unit"
              >
                Código da unidade
              </Label>

              <Input
                id="unit"
                className="col-span-3"
                required
                {...register('unit')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right text-xs"
              >
                Nome da unidade
              </Label>

              <Input
                id="name"
                className="col-span-3"
                required
                {...register('name')}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  type="button"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                disabled={isSubmitting}
                variant="success"
                type="submit"
              >
                Salvar
              </Button>
            </DialogFooter>
          </div>
        </form>
      ) : (
        <h1>Carregando...</h1>
      )}
    </DialogContent>
  )
}