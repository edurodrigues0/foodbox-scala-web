import { getSector } from "@/api/get-sector"
import { updateSector } from "@/api/update-sector"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const updateSectorFormSchema = z.object({
  name: z.string().optional(),
  unit: z.string().optional(),
  supervisorName: z.string().optional(),
  email: z.string().email().optional(),
})

type UpdateSectorFormSchema = z.infer<typeof updateSectorFormSchema>

interface UpdateSectorDialogProps {
  open: boolean
  sectorId: string
}

export function UpdateSectorDialog({
  open,
  sectorId,
}: UpdateSectorDialogProps) {
  const queryClient = useQueryClient()

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateSectorFormSchema>()

  const { data: result } = useQuery({
    queryKey: ["sector", sectorId],
    queryFn: async () => await getSector(sectorId),
    enabled: open && !!sectorId,
  })

  const {
    mutateAsync: updateSectorFn,
    isPending: _isUpdateSector,
  } = useMutation({
    mutationFn: updateSector,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-sectors'] })
    },
    onError: () => {
      toast.error('Falha ao atualizar setor.', {
        position: 'top-center'
      })
    }
  })

  async function handleUpdateSector(data: UpdateSectorFormSchema) {
    await updateSectorFn({
      sectorId,
      body: {
        name: data.name,
        supervisorEmail: data.email,
      }
    })

    toast.success('Setor foi atualizado com sucesso.', {
      position: 'top-center'
    })
  }

  useEffect(() => {
    if (result && result.sector) {
      const { name, supervisor, unity } = result.sector

      reset({
        name: name ?? "",
        supervisorName: supervisor?.name ?? "",
        email: supervisor?.email ?? "",
        unit: unity?.name ?? "",
      })
    }
  }, [result, reset])

  return (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>Edite o setor</DialogTitle>

        <DialogDescription>
          Edite as informações do setor.
        </DialogDescription>
      </DialogHeader>

      { result ? (
        <form onSubmit={handleSubmit(handleUpdateSector)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="name"
              >
                Unidade
              </Label>

              <Input
                id="unit"
                className="col-span-3"
                disabled
                {...register('unit')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="name"
              >
                Nome do setor
              </Label>

              <Input
                id="name"
                className="col-span-3"
                {...register('name')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right text-xs col-span-4">
                Nome do setor deve incluir (manha), (tarde) ou (noite)
              </span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="supervisorName"
              >
                Nome do supervisor
              </Label>

              <Input
                id="name"
                disabled
                className="col-span-3"
                {...register('supervisorName')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                className="text-right text-xs"
                htmlFor="email"
              >
                E-mail do supervisor
              </Label>

              <Input
                id="name"
                className="col-span-3"
                {...register('email')}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="ghost"
                type="button"
                // disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              variant="success"
              type="submit"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <h1>Carregando...</h1>
      )}
    </DialogContent>
  )
}