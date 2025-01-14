import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogClose } from "@radix-ui/react-dialog";

export function MenuDialogSkeleton() {
  return (
    <>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 col-span-3" />
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="ghost"
            type="button"
            disabled={true}
          >
            Cancelar
          </Button>
        </DialogClose>
      <Button
        variant="success"
        type="submit"
        disabled={true}
      >
        Salvar
      </Button>
      </DialogFooter>
    </>
  )
}