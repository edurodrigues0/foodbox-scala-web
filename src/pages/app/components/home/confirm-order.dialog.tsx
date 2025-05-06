import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Dispatch } from "react";

interface ConfirmOrderDialogProps {
  registration: string
  unit: string
  menu: string | string[]
  onConfirm: () => void
  isSubmitting: boolean
  onOpen: Dispatch<React.SetStateAction<boolean>>
}

export function ConfirmOrderDialog({
  onConfirm,
  registration,
  menu,
  unit,
  isSubmitting,
  onOpen,
}: ConfirmOrderDialogProps) {

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Pedido</DialogTitle>
        <DialogDescription>Confirme os dados abaixo antes de solicitar sua marmita.</DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-2 font-semibold">
        <div className="text-sm">Matrícula: {registration}</div>
        <div className="text-sm">
          Unidade: { unit }
        </div>
        <div className="text-sm">
          Marmita: { menu }
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpen(false)}>Cancelar</Button>
        <Button onClick={onConfirm} disabled={isSubmitting}>
          <Check className="mr-2 h-4 w-4" /> Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
