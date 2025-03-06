import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMenu } from "@/api/create-menu";
import { toast } from "sonner";
import { Accompaniments } from "@/components/accompaniments";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getMenu } from "@/api/get-menu";

const createMenuForm = z.object({
  name: z.string(),
  availableDate: z.string(),
  description: z.array(z.string()),
  allergens: z.string().optional(),
})

type CreateMenuForm = z.infer<typeof createMenuForm>

export function MenuDialog() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
  } = useForm<CreateMenuForm>({
    defaultValues: {
      name: "",
      availableDate: "",
      description: [],
      allergens: "",
    }
  })

  const [currentAccompaniment, setCurrentAccompaniment] = useState("")
  const [accompaniments, setAccompaniments] = useState([""])

  const { mutateAsync: createMenuFn } = useMutation({
    mutationFn: createMenu,
  })

  const handleAddAccompaniment = () => {
    if (currentAccompaniment.trim() === "") {
      return
    }

    const currentAccompaniments = getValues("description")
    setValue("description", [...currentAccompaniments, currentAccompaniment.toLowerCase()])
    setCurrentAccompaniment("")
  }

  const handleRemoveAccompaniment = (accompaniment: string) => {
    const newAccompaniments = accompaniments.filter(
      (value) => value !== accompaniment
    )
    setAccompaniments(newAccompaniments)
    setValue("description", newAccompaniments)
  }

  async function handleCreateMenu(data: CreateMenuForm) {
    if (accompaniments.length === 0) {
      return toast.error('Adicione pelo menos um acompanhamento', {
        position: 'top-center'
      })
    }

    try {
      const { menu_name: menuName } = await createMenuFn({
        name: data.name.toLowerCase(),
        serviceDate: data.availableDate,
        allergens: data.allergens?.toLowerCase() || null,
        description: accompaniments,
      })

      toast.success(`O prato ${menuName} foi adicionado com sucesso.`, {
        position: 'top-center'
      })
      
      reset()
    } catch {
      toast.error('Não foi possível salvar o cardápio, tente novamente.', {
        position: 'top-center'
      })
    }
  }

  useEffect(() => {
    setAccompaniments(getValues('description'))
  }, [handleAddAccompaniment])

  return (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>
          Adicione novo cardápio
        </DialogTitle>
        <DialogDescription id="dialog-description">
          Adicione as informações para o cardápio.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateMenu)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-xs" htmlFor="name">
              Nome do Prato
            </Label>

            <Input
              id="name"
              className="col-span-3"
              required
              {...register("name")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-xs" htmlFor="availableDate">
              Disponivél em
            </Label>

            <Input
              id="availableDate"
              type="date"
              className="col-span-3"
              required
              {...register("availableDate")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-xs" htmlFor="allergens">
              Alergenicos
            </Label>

            <Input
              id="allergens"
              className="col-span-3"
              {...register("allergens")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-xs" htmlFor="description">
              Acompanhamentos
            </Label>

            <Input
              id="description"
              name="description"
              autoComplete="off"
              className="col-span-3"
              value={currentAccompaniment}
              onChange={(e) => setCurrentAccompaniment(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-wrap gap-4 w-full py-2">
            { accompaniments.map((accompaniment) => {
              return (
                <Accompaniments
                  key={accompaniment}
                  title={accompaniment}
                  onRemoveAccompaniment={
                    () => handleRemoveAccompaniment(accompaniment)
                  }
                />
              )
            })}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="invisible" />

            <Button
              type="button"
              variant="success"
              className="col-span-3 font-bold"
              onClick={() => handleAddAccompaniment()}
            >
              Adicionar Acompanhamento
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
