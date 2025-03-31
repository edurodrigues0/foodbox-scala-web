import { getColaboratorByRegistration } from "@/api/get-colaborator-by-registration";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, ReactNode } from "react";

interface ConfirmOrderDialogProps {
  children: ReactNode
  registration: number
  onConfirm: () => void
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
}

export function ConfirmOrderDialog({
  children,
  registration,
  onConfirm,
  isOpen,
  setIsOpen
}: ConfirmOrderDialogProps) {

  const { data: response, isLoading } = useQuery({
    queryKey: ["colaborator", registration],
    queryFn: () => getColaboratorByRegistration(registration!),
    enabled: !!registration && isOpen === true,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação</DialogTitle>
          { !response && (
            <DialogDescription>
              <Skeleton className="mt-3 w-full h-5 bg-gray-500" />
            </DialogDescription>
          )}

          { response && response.colaborator && (
            <DialogDescription>
              Você deseja confirmar o pedido <strong>{response?.colaborator.colaborator_name || "..."}</strong>?
              </DialogDescription>
            )
          }
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="success"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Sim, Confirmar
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="destructive">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
