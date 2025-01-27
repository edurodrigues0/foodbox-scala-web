import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterUnitForm() {
  return (
    <form className="space-y-4 w-96">
      <div className="space-y-4">
        <Label>
          Nome da Unidade
        </Label>
        <Input
          id="unit"
        />
      </div>

      <Button className="w-full font-bold">
        Adicionar Unidade
      </Button>
    </form>
  )
}