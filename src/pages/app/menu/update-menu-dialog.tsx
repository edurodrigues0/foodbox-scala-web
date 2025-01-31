import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Accompaniments } from "@/components/accompaniments"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getMenu } from "@/api/get-menu"
import { updateMenu } from "@/api/update-menu"
import { GetMenusResponse } from "@/api/get-menus"
import { MenuDialogSkeleton } from "./menu-dialog-skeleton"

const updateMenuSchema = z.object({
  menuId: z.string().cuid2(),
  name: z.string().optional(),
  serviceDate: z.string().optional(),
  description: z.array(z.string()).optional(),
  allergens: z.string().optional(),
})

type UpdateMenuSchema = z.infer<typeof updateMenuSchema>

export interface UpdateMenuDialogProps {
  open: boolean
  menuId: string
}

export function UpdateMenuDialog({ open, menuId }: UpdateMenuDialogProps) {
  const queryClient = useQueryClient()

  const { data: result } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => await getMenu({ menuId }),
    enabled: open && !!menuId,
  })

  const {
    reset,
    register,
    handleSubmit,
    setValue,
  } = useForm<UpdateMenuSchema>({
    defaultValues: {
      name: "",
      description: [],
      serviceDate: "",
      allergens: "",
    },
  })

  const [currentAccompaniment, setCurrentAccompaniment] = useState("")
  const [accompaniments, setAccompaniments] = useState<string[]>([])

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const handleAddAccompaniment = () => {
    if (
      currentAccompaniment.trim() &&
      !accompaniments.includes(currentAccompaniment)
    ) {
      const updatedAccompaniments = [...accompaniments, currentAccompaniment.trim()]
      setAccompaniments(updatedAccompaniments)
      setValue("description", updatedAccompaniments)
      setCurrentAccompaniment("")
    }
  }

  const handleRemoveAccompaniment = (accompaniment: string) => {
    const updatedAccompaniments = accompaniments.filter((item) => item !== accompaniment)
    setAccompaniments(updatedAccompaniments)
    setValue("description", updatedAccompaniments)
  }

  const { mutateAsync: updateMenuFn, isPending: isUpdateMenu } = useMutation({
    mutationFn: updateMenu,
    async onSuccess(_, data: UpdateMenuSchema) {
      updateMenuOnCache(data)
    },
    onError: () => {
      toast.error("Falha ao atualizar", {
        position: 'top-center'
      })
    },
  })

  const handleUpdateMenu = async (data: UpdateMenuSchema) => {
    await updateMenuFn({
      menuId,
      name: data.name,
      serviceDate: data.serviceDate,
      description: data.description,
      allergens: data.allergens,
    })

    toast.success("Prato editado com sucesso!", {
      position: 'top-center'
    })
  }

  const updateMenuOnCache = (data: UpdateMenuSchema) => {
    const menusListCache = queryClient.getQueriesData<GetMenusResponse>({
      queryKey: ["menu"],
    })

    menusListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData  || !cacheData.menus) {
        return
      }

      queryClient.setQueryData<GetMenusResponse>(cacheKey, {
        ...cacheData,
        menus: cacheData.menus.map((menu) => {
          if (menu.id === menuId) {
            return {
              ...menu,
              ...data,
              service_date: data.serviceDate ?? menu.service_date,
            }
          }

          return menu
        }),
      })
    })

    queryClient.invalidateQueries({
      queryKey: ['menu']
    })
  }

  useEffect(() => {
    if (result?.menu) {
      const { name, description, service_date, allergens } = result.menu
      const formattedName = name[0].toUpperCase() + name.substring(1)

      reset({
        name: formattedName ?? "",
        description: description ?? [],
        serviceDate: formatDate(service_date),
        allergens: allergens ?? "",
      })

      setAccompaniments(description ?? [])
    }
  }, [result, reset])

  return (
    <DialogContent
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogHeader>
        <DialogTitle>Edite o prato</DialogTitle>
        <DialogDescription id="dialog-description">
          Edite as informações do prato.
        </DialogDescription>
      </DialogHeader>

      {result ? (
        <form onSubmit={handleSubmit(handleUpdateMenu)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-xs" htmlFor="name">
                Nome do Prato
              </Label>
              <Input id="name" className="col-span-3" required {...register("name")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-xs" htmlFor="serviceDate">
                Disponível em
              </Label>
              <Input
                id="serviceDate"
                type="date"
                className="col-span-3"
                required
                {...register("serviceDate")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-xs" htmlFor="allergens">
                Alérgenicos
              </Label>
              <Input id="allergens" className="col-span-3" {...register("allergens")} />
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
              {accompaniments.map((accompaniment) => (
                <Accompaniments
                  key={accompaniment}
                  title={accompaniment}
                  onRemoveAccompaniment={() => handleRemoveAccompaniment(accompaniment)}
                />
              ))}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="invisible" />

              <Button
                type="button"
                variant="success"
                className="col-span-3 font-bold"
                onClick={handleAddAccompaniment}
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
            <Button
              variant="success"
              type="submit"
              disabled={isUpdateMenu}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <MenuDialogSkeleton />
      )}
    </DialogContent>
  )
}
